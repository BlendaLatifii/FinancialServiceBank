using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class DbInitialization
    {
        public AppDbContext _context;
        public DbInitialization(AppDbContext context)
        {
            _context = context;
        }

        public async Task Init(CancellationToken cancellationToken)
        {
            await _context.Database.EnsureCreatedAsync();

            if(!_context.Roles.Any())
            {
                _context.Roles.Add(new Domain.Entities.Role()
                {
                    Name = "Admin",
                    NormalizedName ="Admin"
                });

                _context.Roles.Add(new Domain.Entities.Role()
                {
                    Name = "Member",
                    NormalizedName ="Member"
                });
            }

            await _context.SaveChangesAsync();
        }
    }
}
