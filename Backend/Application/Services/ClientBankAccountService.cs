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
    public class ClientBankAccountService : IClientBankAccountService

    {
        public readonly AppDbContext _context;
        private readonly IMapper mapper;
        private readonly IAuthorizationManager _authorizationManager;
        private readonly UserManager<User> userManager;

        public ClientBankAccountService(AppDbContext _context,UserManager<User> userManager,  IMapper mapper, IAuthorizationManager authorizationManager)
        {
            this._context = _context;
            this.mapper = mapper;
            this.userManager = userManager;
            _authorizationManager = authorizationManager;
        }
        public async Task<List<ClientBankAccountModel>> GetAllClientBankAccountAsync(CancellationToken cancellationToken)
        {
            var clientAcc = await _context.ClientBankAccounts.Include(x => x.User).ToListAsync(cancellationToken);

            var clientAccmodel = mapper.Map<List<ClientBankAccountModel>>(clientAcc);
            return clientAccmodel;
        }
        public async Task<int> GetClientBankAccountCount(CancellationToken cancellationToken)
        {
            return await _context.ClientBankAccounts.CountAsync(cancellationToken);
        }
        public async Task<ClientBankAccountModel> GetClientAccountById(Guid Id, CancellationToken cancellationToken)
        {
            var client = await _context.ClientBankAccounts
              .Where(x => x.Id == Id)
              .Include(x => x.User)
              .FirstOrDefaultAsync(cancellationToken);
            if (client == null)
            {
                throw new AppBadDataException();
            }
            else
            {
                var model = mapper.Map<ClientBankAccountModel>(client);
                return model;
            }
        }
        public async Task<ClientBankAccountModel> CreateOrUpdateClientBankAccount(ClientBankAccountModel model, CancellationToken cancellationToken)
        {
            var client = await _context.Users.FirstOrDefaultAsync(x => x.PersonalNumberId == model.PersonalNumber, cancellationToken);
            if (client == null)
            {
                throw new Exception("Client not found with the provided Personal Number.");
            }
            var clientUserId = client.Id;
            Guid? userId = _authorizationManager.GetUserId();
           
            if (userId is null)
            {
                throw new UnauthorizedAccessException("User is not authenticated.");
            }
            ClientBankAccount clientBankAccount= new ClientBankAccount();
            if (!model.Id .HasValue)
            {
                clientBankAccount.DateCreated = DateTime.Now;
                clientBankAccount.DateLastUpdated = DateTime.Now;
                clientBankAccount.CreatedByUserId = userId ?? Guid.Empty;



                await _context.ClientBankAccounts.AddAsync(clientBankAccount, cancellationToken);

          
            }
            else
            {
                 clientBankAccount = await _context.ClientBankAccounts.FindAsync(model.Id);
                clientBankAccount.DateLastUpdated = DateTime.Now;
                clientBankAccount.LastUpdatedByUserId = userId ?? Guid.Empty;

            }
            clientBankAccount.BankAccountId= model.BankAccountId;
            clientBankAccount.BranchId= model.BranchId;
            clientBankAccount.CurrentBalance= model.CurrentBalance;
            clientBankAccount.UserId = clientUserId;

            await _context.SaveChangesAsync(cancellationToken);

            return await GetClientAccountById(clientBankAccount.Id, cancellationToken);
        }
        public async Task<List<ClientBankAccountModel>> GetByPersonalNumberAsync(string personalNumber, CancellationToken cancellationToken)
        {
            var clientAccounts = await _context.ClientBankAccounts
                .Where(x => x.User.PersonalNumberId == personalNumber)
                .ToListAsync(cancellationToken);

            if (clientAccounts == null || clientAccounts.Count == 0)
            {
                throw new AppBadDataException();
            }
            else
            {
                await _context.SaveChangesAsync(cancellationToken);
                var models = clientAccounts.Select(client => mapper.Map<ClientBankAccountModel>(client)).ToList();
                return models;
            }
        }

        public async Task DeleteClientBankAccount(Guid Id, CancellationToken cancellationToken)
        {
            var clientAcc = await _context.ClientBankAccounts
                 .Where(x => x.Id == Id)
                 .FirstOrDefaultAsync(cancellationToken);

            if (clientAcc != null)
            {
                _context.ClientBankAccounts.Remove(clientAcc);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }


        public async Task DeductMaintenanceFeesAfterAMonth(CancellationToken cancellationToken)
        {
            var clientBankAccounts = await _context.ClientBankAccounts
                .Include(cba => cba.BankAccount)
                .ToListAsync(cancellationToken);

            var currentDate = DateTime.UtcNow;

            foreach (var clientBankAccount in clientBankAccounts)
            {
                
                if (currentDate > clientBankAccount.DateLastUpdated.AddMonths(1))
                {
                   
                    var maintenanceFee = Decimal.Parse(clientBankAccount.BankAccount.TarifaMirembajtese);

                    if (clientBankAccount.CurrentBalance >= maintenanceFee)
                    {
                        clientBankAccount.CurrentBalance -= maintenanceFee;

                        clientBankAccount.DateLastUpdated = currentDate;
                    }
                    else
                    {
                        
                        Console.WriteLine($"Insufficient funds for account: {clientBankAccount.AccountNumberGeneratedID}");
                    }
                }
            }
            await _context.SaveChangesAsync(cancellationToken);
        }
        public async Task<List<string>> GetStudentAccountClientsAsync(CancellationToken cancellationToken)
        {
            var studentAccounts = await _context.ClientBankAccounts
                .Include(cba => cba.User)
                .Include(cba => cba.BankAccount)
                .Where(cba => cba.BankAccount.AccountType == "Llogari studentore")
                .ToListAsync(cancellationToken);

            var clientNames = studentAccounts
                .Select(cba => $"{cba.User.UserName} {cba.User.LastName}")
                .ToList();

            return clientNames;
        }
       /* public async Task<List<ListItemModel>> GetClientAccountsSelectListAsync(CancellationToken cancellationToken)
        {
            List<ListItemModel> model;
            const string AdminRole = "Admin";
            const string MemberRole = "Member";
            Guid? userId = _authorizationManager.GetUserId();
           

            //  if (userId is null)
            //  {
            //    throw new UnauthorizedAccessException("User is not authenticated.");
            // }
            var user = await userManager.FindByIdAsync(userId.Value.ToString());

         //   if (user == null)
           // {
           //     throw new UnauthorizedAccessException("User not found.");
            //}
            // Merr rolet e përdoruesit nga userManager
         var userRoles = await userManager.GetRolesAsync(user);

           // if (userRoles == null || !userRoles.Any())
           //{
           //     throw new UnauthorizedAccessException("User has no roles assigned.");
            //}

            if (userRoles.Contains(AdminRole))
            {
                model = await _context.ClientBankAccounts
                    .Select(x => new ListItemModel
                    {
                        Id = x.Id,
                        Name = x.AccountNumberGeneratedID
                    })
                    .ToListAsync(cancellationToken);
            }
            else if (userRoles.Contains(MemberRole))
            {
                model = await _context.ClientBankAccounts
                    .Where(x => x.UserId == userId.Value)
                    .Select(x => new ListItemModel
                    {
                        Id = x.Id,
                        Name = x.AccountNumberGeneratedID
                    })
                    .ToListAsync(cancellationToken);
            }
            else
            {
                model = new List<ListItemModel>();
            }

            return model;
        }*/
        public async Task<List<ListItemModel>> GetClientAccountsSelectListAsync(CancellationToken cancellationToken)
        {
            List<ListItemModel> model = new List<ListItemModel>();
            const string AdminRole = "Admin";
            const string MemberRole = "Member";

            Guid? userId = _authorizationManager.GetUserId();

            // Kontrollo nëse përdoruesi është i loguar
            if (userId == null)
            {
                // Kthe listë bosh për përdoruesin jo të loguar
                return model;
            }

            var user = await userManager.FindByIdAsync(userId.Value.ToString());
            if (user == null)
            {
                // Kthe listë bosh nëse përdoruesi nuk gjendet
                return model;
            }

            // Merr rolet e përdoruesit
            var userRoles = await userManager.GetRolesAsync(user);

            if (userRoles.Contains(AdminRole))
            {
                model = await _context.ClientBankAccounts
                    .Select(x => new ListItemModel
                    {
                        Id = x.Id,
                        Name = x.AccountNumberGeneratedID
                    })
                    .ToListAsync(cancellationToken);
            }
            else if (userRoles.Contains(MemberRole))
            {
                model = await _context.ClientBankAccounts
                    .Where(x => x.UserId == userId.Value)
                    .Select(x => new ListItemModel
                    {
                        Id = x.Id,
                        Name = x.AccountNumberGeneratedID
                    })
                    .ToListAsync(cancellationToken);
            }

            return model;
        }
    }
          
}
