using API.Servicees;
using Domain.Entities;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Application.Services;
using Domain.Interfaces;
using AutoMapper;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Domain.Exceptions;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> userManager;

        private readonly TokenService tokenService;
        private readonly IConfiguration _configuration;
        private readonly IAccountService accountService;
        private readonly IMapper _mapper;
        private readonly AppDbContext _dbContext;
        public AccountController(UserManager<User> userMenager, 
            TokenService tokenService,IAccountService accountService, 
            IMapper _mapper, AppDbContext dbContext, IConfiguration configuration)
        {
            this.userManager = userMenager;
            this.tokenService = tokenService;
            this.accountService = accountService;
            this._mapper = _mapper;
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationModel>> Login([FromBody] LoginModel loginModel, CancellationToken cancellationToken)
        {
            var userModel = await accountService.LoginAsync(loginModel, cancellationToken);
   
            return Ok(userModel);
        }
        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequestModel tokenRequest)
        {
            try
            {
                var authModel = await accountService.RefreshTokenAsync(tokenRequest);
                return Ok(authModel);
            }
            catch (AppBadDataException ex)
            {
                return Unauthorized(ex.Message);
            }
        }


        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterModel registerModel, CancellationToken cancellationToken)
        {
            var result = await accountService.Register(registerModel, cancellationToken);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return Ok();
        }

        [Authorize]
        [HttpGet ("id")]
        public async Task<ActionResult<UserModel>> GetCurrentUser()
        {
            var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return new UserModel
            {
                Email = user.Email,
            };

        }

        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await accountService.ForgotPasswordAsync(model.Email);

            if (result.Succeeded)
            {
                return Ok(new { Message = "Password reset link has been sent to your email." });
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await accountService.ResetPasswordAsync(model);

            if (result.Succeeded)
            {
                return Ok(new { Message = "Password has been reset successfully." });
            }

            return BadRequest(result.Errors);
        }

    }
}
