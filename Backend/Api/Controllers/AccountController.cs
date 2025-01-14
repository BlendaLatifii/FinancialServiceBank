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

        private readonly IAccountService accountService;
        public AccountController(UserManager<User> userMenager,
             IAccountService accountService)
        {
            this.userManager = userMenager;
            this.accountService = accountService;
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
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
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
        [HttpGet("id")]
        public async Task<ActionResult<UserModel>> GetCurrentUser()
        {
            var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return new UserModel
            {
                Email = user.Email,
            };

        }
        [HttpGet]
        public async Task<ActionResult<List<UserModel>>> GetAllUsers(CancellationToken cancellationToken)
        {
            var users = await accountService.GetAllUsersAsync(cancellationToken);

            return Ok(users);
        }
        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetUsersSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await accountService.GetUsersSelectListAsync(cancellationToken);
            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById([FromRoute] Guid id, CancellationToken cancellationToken)
        {

            var model = await accountService.GetUserById(id!, cancellationToken);
            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> AddOrEditUserAsync([FromBody] UserModel model, CancellationToken cancellationToken)
        {
            var updateUser = await accountService.AddOrEditUserAsync(model, cancellationToken);
            return Ok(updateUser);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(CancellationToken cancellationToken, Guid id)
        {
            await accountService.DeleteUser(id, cancellationToken);
            return Ok();
        }
    }
}
