using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext appDbContext;
        private readonly IUserService _userService;
        private readonly UserManager<User> userManager;

        public UsersController(AppDbContext appDbContext, UserManager<User> userManager, IUserService _userService)
        {
            this.appDbContext = appDbContext;
            this.userManager = userManager;
            this._userService = _userService;
        }
        [HttpGet]
        public async Task<ActionResult<List<UserModel>>> GetAllUsers(CancellationToken cancellationToken)
        {
            var users = await _userService.GetAllUsersAsync(cancellationToken);

            return Ok(users);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetUserById(Guid userId, CancellationToken cancellationToken)
        {
            await _userService.GetUserById(userId, cancellationToken);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult<UserModel>> CreateUser(UserModel model)
        {
            var user = new User() {
                LastName = model.LastName,
                UserName = model.UserName,
                Email = model.Email
            };

           var result = await userManager.CreateAsync(user,model.Password);

            if (!result.Succeeded)
            {
                return BadRequest();
            }
            return model;
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateUser([FromRoute] Guid id, UserModel model , CancellationToken cancellationToken)
        {
            var users = await appDbContext.Users
               .Where(x => x.Id == id)
               .FirstOrDefaultAsync(cancellationToken);

            if (users == null)
            {
                return NotFound();
            }  

            users.UserName = model.UserName;
            users.LastName = model.LastName;
            users.Email = model.Email;

            await appDbContext.SaveChangesAsync(cancellationToken);

            var updatedUserModel = new UserModel
            {
                Id = users.Id,
                UserName = users.UserName,
                LastName = users.LastName,
                Email = users.Email
            };
            return Ok(updatedUserModel);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(CancellationToken cancellationToken, Guid id)
        {
            await _userService.DeleteUser(id, cancellationToken);
            return Ok();
        }

    }
}
