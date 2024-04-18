using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class UserService : IUserService
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public UserService(AppDbContext context,IMapper mapper)
        {
            _context = context;
            this._mapper = mapper;
        }

        public async Task<List<UserModel>> GetAllUsersAsync(CancellationToken cancellationToken)
        {
            var users = await _context.Users.ToListAsync(cancellationToken);

            var usermodel = _mapper.Map<List<UserModel>>(users);
            return usermodel;


        }

        public async Task GetUserById( Guid userId, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Where(x => x.Id == userId)
                .FirstOrDefaultAsync(cancellationToken);
            if (user != null)
            {
                await _context.SaveChangesAsync(cancellationToken);
            }


        }

        public async Task DeleteUser(Guid userId,CancellationToken cancellationToken)
        {
            var user = await _context.Users
                 .Where(x => x.Id == userId)
                 .FirstOrDefaultAsync(cancellationToken);

           if(user != null)
            {
                _context.Users.Remove(user);
               await  _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
