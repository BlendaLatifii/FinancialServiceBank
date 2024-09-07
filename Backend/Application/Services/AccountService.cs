
using AutoMapper;
using Domain.Constant;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Infrastructure.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Application.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> userManager;

        private readonly AppDbContext _dbContext;
        private readonly IConfiguration _configuration;
        private readonly IAuthorizationManager authorizationManager;
        private readonly IMapper _mapper;
        private readonly IEmailSenderService _emailSender;
        public AccountService(UserManager<User> userManager,
            AppDbContext _dbContext,
            IEmailSenderService emailSender,
            IAuthorizationManager authorizationManager,
            IConfiguration _configuration,
            IMapper mapper)
        {
            this.userManager = userManager;
            this.authorizationManager = authorizationManager;
            this._dbContext = _dbContext;
            this._configuration = _configuration;
            this._mapper = mapper;
            _emailSender = emailSender;
        }

        public async Task<AuthenticationModel> LoginAsync(LoginModel loginModel, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users
                .Where(x => x.Email == loginModel.Email)
                .FirstOrDefaultAsync(cancellationToken);

            if (user is null)
            {
                throw new AppBadDataException();
            }

            if (!await userManager.CheckPasswordAsync(user, loginModel.Password))
            {
                throw new AppBadDataException(ErrorMessage.BadPassword);
            }
            var authClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name,user.UserName),
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim("sub",user.Id.ToString())
            };

            var userRoles = await userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }
            var authSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWTSettings:TokenKey"]));

            var token = new JwtSecurityToken(
                claims: authClaims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            IdentityModelEventSource.ShowPII = true;

            var userData = _mapper.Map<UserModel>(user);

            var jwtTOken = new JwtSecurityTokenHandler().WriteToken(token);

            var refreshToken = await GenerateRefreshToken(user,null);
            var response = new AuthenticationModel()
            {
                Token = jwtTOken,
                RefreshToken = refreshToken.Token,
                ExpiresAt = token.ValidTo,
                UserData = userData!,
                UserRole = userRoles.FirstOrDefault()!
            };

            return response;
        }
        private JwtSecurityToken GenerateJwtToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWTSettings:TokenKey"]));

            var token = new JwtSecurityToken(
                claims: authClaims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            return token;
        }
        public async Task<AuthenticationModel> RefreshTokenAsync(TokenRequestModel tokenRequest)
        {
            var claimsPrincipal = GetPrincipalFromExpiredToken(tokenRequest.Token);
            var userId = claimsPrincipal.Claims.Where(x => x.Type == ClaimTypes.NameIdentifier).Select(x => x.Value).FirstOrDefault();
            var user = await _dbContext.Users.FindAsync(Guid.Parse(userId!));

            if (user == null)
            {
                throw new AppBadDataException("Unauthorized");
            }

            var refreshToken = await _dbContext.RefreshTokens
                .Where(rt => rt.Token == tokenRequest.RefreshToken && rt.User.Id == user.Id)
                .FirstOrDefaultAsync();

            if (refreshToken == null || refreshToken.ExpiresAt < DateTime.Now)
            {
                _dbContext.RefreshTokens.RemoveRange(_dbContext.RefreshTokens.Where(x => x.UserId == user.Id));
                await _dbContext.SaveChangesAsync();
                throw new AppBadDataException("Invalid or expired refresh token");
            }

            var newJwtToken = GenerateJwtToken(claimsPrincipal.Claims.ToList());
            var newJwtTokenString = new JwtSecurityTokenHandler().WriteToken(newJwtToken);
            var newRefreshToken = await GenerateRefreshToken(user,refreshToken);

            var userData = _mapper.Map<UserModel>(user);
            var userRoles = await userManager.GetRolesAsync(user);
            var userRole = userRoles.FirstOrDefault();

            return new AuthenticationModel
            {
                Token = newJwtTokenString,
                RefreshToken = newRefreshToken.Token,
                ExpiresAt = newJwtToken.ValidTo,
                UserData = userData,
                UserRole = userRole
            };
        }
        private async Task<RefreshToken> GenerateRefreshToken(User user,RefreshToken? token)
        {
            _dbContext.RefreshTokens.RemoveRange(_dbContext.RefreshTokens.Where(x => x.UserId == user.Id));
           
              var refreshtoken = new RefreshToken
                {
                    Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                    ExpiresAt = token?.ExpiresAt ?? DateTime.Now.AddHours(8),
                    User = user,
                    UserId = user.Id
                };


            _dbContext.RefreshTokens.Add(refreshtoken);
            await _dbContext.SaveChangesAsync();

            return refreshtoken;
        }
        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateLifetime = false, // Lejojmë token-in të jetë skaduar
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWTSettings:TokenKey"]))
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

            if (!(securityToken is JwtSecurityToken jwtSecurityToken) ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }
        public async Task<IdentityResult> Register(RegisterModel registerModel, CancellationToken cancellationToken)
        {
            var user = new User { UserName = registerModel.UserName, LastName = registerModel.LastName,
                Email = registerModel.Email,
                MiddleName= registerModel.MiddleName,
                PersonalNumberId= registerModel.PersonalNumberId};

            var result = await userManager.CreateAsync(user, registerModel.Password);
            if (!result.Succeeded)
            {
                return result;
            }
            await userManager.AddToRoleAsync(user, "Member");
            return result;
        }

        public async Task<IdentityResult> ForgotPasswordAsync(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "No user associated with email" });
            }

            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var resetLink = $"{_configuration["AppUrl"]}/reset-password?token={token}&email={email}";

            // Dërgo email-in
            await _emailSender.SendEmailAsync(email, "Reset Password", $"Please reset your password by clicking here: <a href='{resetLink}'>link</a>");

            return IdentityResult.Success;
        }

        public async Task<IdentityResult> ResetPasswordAsync(ResetPasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "No user associated with email" });
            }

            var result = await userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);
            return result;
        }
    }

}
