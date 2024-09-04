using AutoMapper;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Infrastructure.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class UserService : IUserService
    {
        public readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IAuthorizationManager _authorizationManager;
        public UserService(AppDbContext context,IMapper mapper, UserManager<User> userManager, IAuthorizationManager authorizationManager)
        {
            _dbContext = context;
            _mapper = mapper;
            _userManager = userManager;
            _authorizationManager = authorizationManager;
        }

        public async Task<List<UserModel>> GetAllUsersAsync(CancellationToken cancellationToken)
        {
            var users = await _dbContext.Users.ToListAsync(cancellationToken);

            var usermodel = _mapper.Map<List<UserModel>>(users);
            return usermodel;


        }

        public async Task<UserModel> AddOrEditUserAsync(UserModel model, CancellationToken cancellationToken)
        {
            var user = new User();

            if (!model.Id.HasValue)
            {
                 user = new User {
                     UserName = model.UserName,
                     LastName = model.LastName, 
                     Email = model.Email ,
                     MiddleName=model.MiddleName, 
                     PersonalNumberId=model.PersonalNumberId
                 };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (!result.Succeeded)
                {
                    throw new AppBadDataException();
                }

            }
            else
            {
                 user = await _dbContext.Users
                .Include(x => x.UserRoles)
                .Where(x => x.Id == model.Id.Value)
                .FirstOrDefaultAsync(cancellationToken);

                if(user is null)
                {
                    throw new AppBadDataException();
                }

                var roles =await _userManager.GetRolesAsync(user);
               await _userManager.RemoveFromRolesAsync(user, roles);

                if (model.Password != null)
                {
                    await _userManager.RemovePasswordAsync(user);

                    await _userManager.AddPasswordAsync(user, model.Password);
                }

            }

            user.Email = model.Email;
            user.LastName = model.LastName;
            user.UserName = model.UserName;
            user.MiddleName = model.MiddleName;
            user.PersonalNumberId = model.PersonalNumberId;

            if (model.Role == Domain.Enums.Role.Admin)
            {
                await _userManager.AddToRoleAsync(user, "Admin");
            }
            else
            {
                await _userManager.AddToRoleAsync(user, "Member");
            }

            await _dbContext.SaveChangesAsync(cancellationToken);

            return model;
        }
        public async Task<UserModel> GetUserById( Guid userId, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users
                .Include(x=> x.UserRoles)
                .Where(x => x.Id == userId)
                .FirstOrDefaultAsync(cancellationToken);
            

           
            if (user is null)
            {
                throw new AppBadDataException();
            }
            var roles = await _userManager.GetRolesAsync(user);
            var model = _mapper.Map<UserModel>(user);

            if(roles.Any(x=> x == "Admin"))
            {
                model.Role = Domain.Enums.Role.Admin;
            }
            else
            {
                model.Role = Domain.Enums.Role.Member;
            }

            return model;

        }

        public async Task DeleteUser(Guid userId,CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users
                 .Where(x => x.Id == userId)
                 .FirstOrDefaultAsync(cancellationToken);

           if(user != null)
            {
                _dbContext.Users.Remove(user);
               await _dbContext.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
