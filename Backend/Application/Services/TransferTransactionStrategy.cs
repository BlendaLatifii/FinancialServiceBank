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
    public class TransferTransactionStrategy : ITransactionStrategy
    {
        private readonly AppDbContext _context;

        public TransferTransactionStrategy(AppDbContext context)
        {
            _context = context;
        }

        public async Task ProcessTransactionAsync(TransactionModel model, CancellationToken cancellationToken)
        {
            var sourceAccount = await _context.ClientBankAccounts
                .FirstOrDefaultAsync(a => a.AccountNumberGeneratedID == model.SourceClientBankAccount, cancellationToken);

            var destinationAccount = await _context.ClientBankAccounts
                .FirstOrDefaultAsync(a => a.AccountNumberGeneratedID == model.DestinationClientBankAccount, cancellationToken);

            if (sourceAccount == null || destinationAccount == null)
                throw new Exception("Both source and destination accounts are required for a transfer.");

            if (sourceAccount.AccountNumberGeneratedID == destinationAccount.AccountNumberGeneratedID)
                throw new Exception("Source and destination accounts cannot be the same.");

            if (sourceAccount.CurrentBalance < model.TransactionAmount)
                throw new Exception("Insufficient funds for transfer.");

            sourceAccount.CurrentBalance -= model.TransactionAmount;
            destinationAccount.CurrentBalance += model.TransactionAmount;
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
