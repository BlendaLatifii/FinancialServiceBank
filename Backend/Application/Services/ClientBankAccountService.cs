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
            if (!model.Id .HasValue)
            {
                var newBankAcc = new ClientBankAccount()
                {
                    BankAccountId = model.BankAccountId,
                    BranchId = model.BranchId,
                    CurrentBalance = model.CurrentBalance,
                    DateCreated = DateTime.UtcNow,
                    DateLastUpdated = DateTime.UtcNow,
                    UserId = clientUserId,
                    CreatedByUserId = userId ?? Guid.Empty,
                    LastUpdatedByUserId = userId ?? Guid.Empty
                };

                await _context.ClientBankAccounts.AddAsync(newBankAcc, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return await GetClientAccountById(newBankAcc.Id, cancellationToken);
            }
            else
            {
                var existingBankAcc = await _context.ClientBankAccounts.FindAsync(model.Id);
                if (existingBankAcc == null)
                {
                    throw new AppBadDataException();
                }
                existingBankAcc.BankAccountId = model.BankAccountId;
                existingBankAcc.BranchId = model.BranchId;
                existingBankAcc.CurrentBalance = model.CurrentBalance;
                existingBankAcc.DateLastUpdated = DateTime.UtcNow;
                existingBankAcc.LastUpdatedByUserId = userId ?? Guid.Empty;


                await _context.SaveChangesAsync(cancellationToken);

                return new ClientBankAccountModel
                {
                    Id = existingBankAcc.Id,
                    UserId = existingBankAcc.UserId,
                    BankAccountId = existingBankAcc.BankAccountId,
                    BranchId=existingBankAcc.BranchId,
                    CurrentBalance = existingBankAcc.CurrentBalance,
                    DateCreated = existingBankAcc.DateCreated,
                    DateLastUpdated = existingBankAcc.DateLastUpdated,
            };
            }
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
        public async Task<List<ListItemModel>> GetClientAccountsSelectListAsync(CancellationToken cancellationToken)
        {
            List<ListItemModel> model;
            const string AdminRole = "Admin";
            const string MemberRole = "Member";
            Guid? userId = _authorizationManager.GetUserId();

            if (userId is null)
            {
                throw new UnauthorizedAccessException("User is not authenticated.");
            }
            var user = await userManager.FindByIdAsync(userId.Value.ToString());

            if (user == null)
            {
                throw new UnauthorizedAccessException("User not found.");
            }
            // Merr rolet e përdoruesit nga userManager
            var userRoles = await userManager.GetRolesAsync(user);

            if (userRoles == null || !userRoles.Any())
            {
                throw new UnauthorizedAccessException("User has no roles assigned.");
            }

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
        }
    }
}
