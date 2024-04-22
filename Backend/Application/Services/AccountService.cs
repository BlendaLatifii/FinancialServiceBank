using API.Servicees;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> userManager;
        private readonly TokenService tokenService;
        public AccountService(UserManager<User> userManager, TokenService tokenService)
        {
            this.userManager = userManager;
            this.tokenService = tokenService; 
        }

        public async Task<UserModel> Login(LoginModel loginModel, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByEmailAsync(loginModel.Email);
            if (user == null || !await userManager.CheckPasswordAsync(user, loginModel.Password))
            {
                return null; 
            }
            return new UserModel
            {
                Email = user.Email,
                Token = await tokenService.GenerateToken(user)
            };
        }

        public  async Task<IdentityResult> Register(RegisterModel registerModel, CancellationToken cancellationToken)
        {
            var user = new User { UserName = registerModel.UserName, LastName= registerModel.LastName, Email = registerModel.Email };

            var result = await userManager.CreateAsync(user, registerModel.Password);
            if (!result.Succeeded)
            {
                return result; 
            }
            await userManager.AddToRoleAsync(user, "Member");
            return result; 


        }
    }
}
