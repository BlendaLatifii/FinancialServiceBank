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
    public class BankAccountService : IBankAccountService
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAuthorizationManager _authorizationManager;

        public BankAccountService(AppDbContext _context, IAuthorizationManager authorizationManager, IMapper _mapper)
        {
            this._context = _context;
            this._mapper = _mapper;
            _authorizationManager = authorizationManager;
        }

        public async Task<List<BankAccountModel>> GetAllBankAccountsAsync(CancellationToken cancellationToken)
        {
            var bankAcc = await _context.BankAccounts.Include(x => x.User).ToListAsync(cancellationToken);

            var bankaccmodel = _mapper.Map<List<BankAccountModel>>(bankAcc);
            return bankaccmodel;
        }
        public async Task<BankAccountModel> GetBankAccountById(Guid id, CancellationToken cancellationToken)
        {
            var account = await _context.BankAccounts
                .Where(x => x.Id == id)
                .Include(x => x.User)
                .FirstOrDefaultAsync(cancellationToken);
            if (account == null)
            {
                throw new AppBadDataException();
            }
            else
            {
                var model = _mapper.Map<BankAccountModel>(account);
                return model;
            }

        }

        public async Task<List<ListItemModel>> GetBankAccountsSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await _context.BankAccounts
                .Select(x => new ListItemModel()
                {
                    Id = x.Id,
                    Name = x.AccountType
                }).ToListAsync(cancellationToken);

            return model;

        }
        public async Task<BankAccountModel> CreateOrUpdateBankAccount(BankAccountModel model, CancellationToken cancellationToken)
        {
            Guid? userId = _authorizationManager.GetUserId();

            if (userId is null)
            {
                throw new UnauthorizedAccessException("User is not authenticated.");
            }
            BankAccount bankAccount = new BankAccount();
            if (model.Id == null || model.Id == Guid.Empty)
            {
                bankAccount.UserId = userId ?? Guid.Empty;


                await _context.BankAccounts.AddAsync(bankAccount, cancellationToken);
            }
            else
            {
                bankAccount = await _context.BankAccounts.FindAsync(model.Id);
            }
            bankAccount.AccountType = model.AccountType;
            bankAccount.AccountDescription = model.AccountDescription;
            bankAccount.TarifaMirembajtese = model.TarifaMirembajtese;
            await _context.SaveChangesAsync(cancellationToken);
            return await GetBankAccountById(bankAccount.Id, cancellationToken);
        }


        public async Task DeleteAccount(Guid id, CancellationToken cancellationToken)
        {
            var account = await _context.BankAccounts
                 .Where(x => x.Id == id)
                 .FirstOrDefaultAsync(cancellationToken);

            if (account == null)
            {
                throw new ApplicationException("Account does not exist.");
            }
            _context.BankAccounts.Remove(account);
            await _context.SaveChangesAsync();
        }

    }
}
