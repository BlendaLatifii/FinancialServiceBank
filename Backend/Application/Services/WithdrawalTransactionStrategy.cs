using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class WithdrawalTransactionStrategy : ITransactionStrategy
    {
        private readonly AppDbContext _context;

        public WithdrawalTransactionStrategy(AppDbContext context)
        {
            _context = context;
        }

        public async Task ProcessTransactionAsync(TransactionModel model, CancellationToken cancellationToken)
        {
            var sourceAccount = await _context.ClientBankAccounts
                .FirstOrDefaultAsync(a => a.AccountNumberGeneratedID == model.SourceClientBankAccount, cancellationToken);

            if (sourceAccount == null)
                throw new Exception("Source account is required for a withdrawal.");

            if (sourceAccount.CurrentBalance < model.TransactionAmount)
                throw new Exception("Insufficient funds for withdrawal.");

            sourceAccount.CurrentBalance -= model.TransactionAmount;
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
