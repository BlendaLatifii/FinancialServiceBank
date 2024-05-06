
using AutoMapper;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
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

        public async Task<List<BankAccountModel>> GetAllBankAccountsAsync(CancellationToken cancellationToken)
        {
            var bankAcc = await _context.BankAccounts.ToListAsync(cancellationToken);

            var bankaccmodel = _mapper.Map<List<BankAccountModel>>(bankAcc);
            return bankaccmodel;
        }
        public async Task<BankAccountModel> GetBankAccountById(Guid id, CancellationToken cancellationToken)
        {
            var bankAcc = await _context.BankAccounts
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
            
            if (bankAcc == null)
            {
                throw new AppBadDataException();
            }
            else
            {
                await _context.SaveChangesAsync(cancellationToken);
                var model = _mapper.Map<BankAccountModel>(bankAcc);
                return model;
            }
        }
        public async Task<BankAccountModel> CreateOrUpdateBankAccount(BankAccountModel model, CancellationToken cancellationToken)
        {
            if (model.Id == null)
            {
                var newBankAcc = new BankAccount()
                {
                    AccountType = model.AccountType,
                    AccountDescription = model.AccountDescription
                };

                await _context.BankAccounts.AddAsync(newBankAcc, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                // Kthe një përgjigje 201 Created dhe modelin e degës së krijuar
                return new BankAccountModel
                {
                    AccountType = newBankAcc.AccountType,
                    AccountDescription = newBankAcc.AccountDescription
                };
            }
            else
            {
                var existingBankAcc = await _context.BankAccounts.FindAsync(model.Id);
                if (existingBankAcc == null)
                {
                    throw new AppBadDataException();
                }

                existingBankAcc.AccountType = model.AccountType;
                existingBankAcc.AccountDescription = model.AccountDescription;

                await _context.SaveChangesAsync(cancellationToken);

                return new BankAccountModel
                {
                    AccountType = existingBankAcc.AccountType,
                    AccountDescription = existingBankAcc.AccountDescription
                };
            }
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
