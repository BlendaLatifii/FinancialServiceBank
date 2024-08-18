using AutoMapper;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class ClientBankAccountService : IClientBankAccountService

    {
        public readonly AppDbContext _context;
        private readonly IMapper mapper;
        private readonly IAuthorizationManager _authorizationManager;

        public ClientBankAccountService(AppDbContext _context,  IMapper mapper, IAuthorizationManager authorizationManager)
        {
            this._context = _context;
            this.mapper = mapper;
            _authorizationManager = authorizationManager;
        }
        public async Task<List<ClientBankAccountModel>> GetAllClientBankAccountAsync(CancellationToken cancellationToken)
        {
            var clientAcc = await _context.ClientBankAccounts.Include(x => x.User).Include(x=> x.Client).ToListAsync(cancellationToken);

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
              .Include(x=> x.Client)
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
            Guid? userId = _authorizationManager.GetUserId();

            if (userId is null)
            {
                throw new UnauthorizedAccessException("User is not authenticated.");
            }
            var client = await _context.Clients.FirstOrDefaultAsync(x => x.PersonalNumberId == model.PersonalNumber, cancellationToken);
            if (client == null)
            {
                throw new Exception("Client not found with the provided Personal Number.");
            }
            if (!model.Id .HasValue)
            {
                var newBankAcc = new ClientBankAccount()
                {
                    ClientId = client.Id,
                    BankAccountId = model.BankAccountId,
                    BranchId = model.BranchId,
                    CurrentBalance = model.CurrentBalance,
                    DateCreated = DateTime.UtcNow,
                    DateLastUpdated = DateTime.UtcNow,
                    UserId = userId ?? Guid.Empty
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
                existingBankAcc.ClientId = client.Id;
                existingBankAcc.BankAccountId = model.BankAccountId;
                existingBankAcc.BranchId = model.BranchId;
                existingBankAcc.CurrentBalance = model.CurrentBalance;
                existingBankAcc.DateLastUpdated = DateTime.UtcNow;


                await _context.SaveChangesAsync(cancellationToken);

                return new ClientBankAccountModel
                {
                    Id = existingBankAcc.Id,
                    ClientId = existingBankAcc.ClientId,
                    BankAccountId = existingBankAcc.BankAccountId,
                    BranchId=existingBankAcc.BranchId,
                    CurrentBalance = existingBankAcc.CurrentBalance,
                    DateCreated = existingBankAcc.DateCreated,
                    DateLastUpdated = existingBankAcc.DateLastUpdated
                };
            }
        }
        public async Task<List<ClientBankAccountModel>> GetByPersonalNumberAsync(string personalNumber, CancellationToken cancellationToken)
        {
            var clientAccounts = await _context.ClientBankAccounts
                .Where(x => x.Client.PersonalNumberId == personalNumber)
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
            // Merr të gjitha llogaritë bankare të klientëve
            var clientBankAccounts = await _context.ClientBankAccounts
                .Include(cba => cba.BankAccount)
                .ToListAsync(cancellationToken);

            // Përcakto datën e sotme
            var currentDate = DateTime.UtcNow;

            foreach (var clientBankAccount in clientBankAccounts)
            {
                // Kontrollo nëse ka kaluar një muaj nga data e fundit e përditësimit të llogarisë
                if (currentDate > clientBankAccount.DateLastUpdated.AddMonths(1))
                {
                    // Merr tarifën e mirëmbajtjes së llogarisë së zgjedhur nga klienti
                    var maintenanceFee = Decimal.Parse(clientBankAccount.BankAccount.TarifaMirembajtese);

                    // Zbres balancën e llogarisë së klientit
                    clientBankAccount.CurrentBalance -= maintenanceFee;

                    // Përditëso datën e fundit të përditësimit të llogarisë
                    clientBankAccount.DateLastUpdated = currentDate;
                }
            }

            // Ruaj ndryshimet në bazën e të dhënave
            await _context.SaveChangesAsync(cancellationToken);
        }
        public async Task<List<string>> GetStudentAccountClientsAsync(CancellationToken cancellationToken)
        {
            var studentAccounts = await _context.ClientBankAccounts
                .Include(cba => cba.Client)
                .Include(cba => cba.BankAccount)
                .Where(cba => cba.BankAccount.AccountType == "Llogari studentore")
                .ToListAsync(cancellationToken);

            var clientNames = studentAccounts
                .Select(cba => $"{cba.Client.FirstName} {cba.Client.LastName}")
                .ToList();

            return clientNames;
        }
    }
}
