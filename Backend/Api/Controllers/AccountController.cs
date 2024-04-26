using API.Servicees;
using Domain.Entities;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Application.Services;
using Domain.Interfaces;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> userManager;

        private readonly TokenService tokenService;
        private readonly IAccountService accountService;
        public AccountController(UserManager<User> userMenager, 
            TokenService tokenService , IAccountService accountService)
        {
            this.userManager = userMenager;
            this.tokenService = tokenService;
            this.accountService = accountService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserModel>> Login(LoginModel loginModel, CancellationToken cancellationToken)
        {
            var userModel = await accountService.Login(loginModel, cancellationToken);
            if (userModel == null)
            {
                return Unauthorized();
            }
            return Ok(userModel);
        }

        [HttpPost("register")]

        public async Task<ActionResult> Register([FromBody] RegisterModel registerModel, CancellationToken cancellationToken)
        {
            var result = await accountService.Register(registerModel, cancellationToken);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return StatusCode(201);
        }

        [Authorize]
        [HttpGet ("id")]
        public async Task<ActionResult<UserModel>> GetCurrentUser()
        {
            var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return new UserModel
            {
                Email = user.Email,
                Token = await tokenService.GenerateToken(user)
            };

        }

    }
}
