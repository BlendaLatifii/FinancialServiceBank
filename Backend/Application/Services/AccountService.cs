
using AutoMapper;
using Domain.Constant;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Application.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> userManager;

        private readonly AppDbContext _dbContext;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IEmailSenderService _emailSender;
        public AccountService(UserManager<User> userManager, AppDbContext _dbContext,IEmailSenderService emailSender, IConfiguration _configuration, IMapper mapper)
        {
            this.userManager = userManager;
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
            };

            var userRoles = await userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }
            var authSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWTSettings:TokenKey"]));

            var token = new JwtSecurityToken(
                claims: authClaims,
                expires: DateTime.UtcNow.AddHours(8),
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            IdentityModelEventSource.ShowPII = true;

            var userData = _mapper.Map<UserModel>(user);

            var jwtTOken = new JwtSecurityTokenHandler().WriteToken(token);
            var response = new AuthenticationModel()
            {
                Token = jwtTOken,
                RefreshToken = null!,
                ExpiresAt = token.ValidTo,
                UserData = userData!,
                UserRole = userRoles.FirstOrDefault()!

            };

            return response;
        }

        public async Task<IdentityResult> Register(RegisterModel registerModel, CancellationToken cancellationToken)
        {
            var user = new User { UserName = registerModel.UserName, LastName = registerModel.LastName, Email = registerModel.Email };

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
