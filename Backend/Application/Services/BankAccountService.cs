
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class BankAccountService : IBankAccountService
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public BankAccountService(AppDbContext _context, IMapper _mapper)
        {
            this._context = _context;
            this._mapper = _mapper;
        }

		public async Task<BankAccount> GetByAccountNumber(string BankAccountNumber, CancellationToken cancellationToken)
		{
			var account = await _context.BankAccounts.FirstOrDefaultAsync(x => x.AccountNumberGenerated == BankAccountNumber, cancellationToken);

			return account;
		}


		/*public async Task<List<BankAccountModel>> GetAllBankAccountsAsync(CancellationToken cancellationToken)
        {
            var accounts = await _context.BankAccounts.ToListAsync(cancellationToken);
            var accountModel = _mapper.Map<List<BankAccountModel>>(accounts);

            return accountModel;
        } */

      /*  public async Task GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            var account = await _context.BankAccounts
               .Where(x => x.ID == id)
                .FirstOrDefaultAsync(cancellationToken);
            if (account != null)
            {
                await _context.SaveChangesAsync(cancellationToken);
            }
        } */

        public async Task CreateBankAccount (BankAccount bankaccount)
        {
            if ( _context.BankAccounts.Any(x => x.Email == bankaccount.Email)) throw new ApplicationException("An account already exists with this email");
            _context.BankAccounts.Add(bankaccount);
            _context.SaveChanges();
        }

		public async Task UpdateBankAccount(BankAccount bankAccount)
        {
            var accountToBeUpdated = _context.BankAccounts.Where(x => x.Email == bankAccount.Email).SingleOrDefault();
            if (accountToBeUpdated == null) throw new ApplicationException("Account does not exist!");
            if (_context.BankAccounts.Any(x => x.Email == bankAccount.Email)) throw new ApplicationException("This Email " + bankAccount.Email + " is already taken.");
			accountToBeUpdated.Email = bankAccount.Email;
			await _context.SaveChangesAsync();

		}
		public async Task DeleteAccount(int id, CancellationToken cancellationToken)
        {
            var account = await _context.BankAccounts
                 .Where(x => x.ID == id)
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
