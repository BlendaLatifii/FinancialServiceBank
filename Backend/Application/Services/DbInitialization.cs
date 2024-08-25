using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;


namespace Application.Services
{
    public class DbInitialization
    {
        public AppDbContext _context;
        private readonly UserManager<User> userManager;
        public DbInitialization(AppDbContext context,
            UserManager<User> usermanager)
        {
            _context = context;
            this.userManager = usermanager;
        }

        public async Task Init(CancellationToken cancellationToken)
        {
            await _context.Database.EnsureCreatedAsync();

            if (!_context.Roles.Any())
            {
                _context.Roles.Add(new Role()
                {
                    Name = "Admin",
                    NormalizedName = "Admin"
                });

                _context.Roles.Add(new Role()
                {
                    Name = "Member",
                    NormalizedName = "Member"
                });
            }

            if (!_context.Users.Any())
            {
                var adminUser = new User()
                { 
                    
                 LastName ="Manager",
                 Email ="admin@gmail.com",
                 UserName ="Admin",
                 MiddleName="Filan",
                 PersonalNumberId="12222222",
                };

                var simpleUser = new User()
                {
                    LastName = "User",
                    Email = "member@gmail.com",
                    UserName = "Simple",
                    MiddleName = "Filan",
                    PersonalNumberId = "1333333",
                };

                await userManager.CreateAsync(adminUser, "Pa$$w0rd");
                await userManager.CreateAsync(simpleUser, "Pa$$w0rd");

                await userManager.AddToRoleAsync(adminUser, "Admin");
                await userManager.AddToRoleAsync(simpleUser, "Member");

                await _context.SaveChangesAsync(cancellationToken);

             
            }

            await _context.SaveChangesAsync();
        }
    }
}
