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
    public class DepositTransactionStrategy : ITransactionStrategy
    {
        private readonly AppDbContext _context;

        public DepositTransactionStrategy(AppDbContext context)
        {
            _context = context;
        }

        public async Task ProcessTransactionAsync(TransactionModel model, CancellationToken cancellationToken)
        {
            var destinationAccount = await _context.ClientBankAccounts
                .FirstOrDefaultAsync(a => a.AccountNumberGeneratedID == model.DestinationClientBankAccount, cancellationToken);

            if (destinationAccount == null)
                throw new Exception("Destination account is required for a deposit.");

            destinationAccount.CurrentBalance += model.TransactionAmount;
          _context.ClientBankAccounts.Update(destinationAccount);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
