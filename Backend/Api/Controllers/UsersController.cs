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


        public UsersController(AppDbContext appDbContext, IUserService _userService)
        {
            this.appDbContext = appDbContext;
            this._userService = _userService;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<UserModel>>> GetAllUsers(CancellationToken cancellationToken)
        {
            var users = await _userService.GetAllUsersAsync(cancellationToken);

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById([FromRoute] Guid id, CancellationToken cancellationToken)
        {
           
           var model =  await _userService.GetUserById(id!, cancellationToken);
            return Ok(model);
        }
       
        [HttpPost]
        public async Task<IActionResult> AddOrEditUserAsync([FromBody]UserModel model , CancellationToken cancellationToken)
        {
            var updateUser = await _userService.AddOrEditUserAsync(model, cancellationToken);
            return Ok(updateUser);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(CancellationToken cancellationToken, Guid id)
        {
            await _userService.DeleteUser(id, cancellationToken);
            return Ok();
        }

    }
}
