using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class TransactionService : ITransactionService
    {
        public readonly AppDbContext _context;
        private readonly IMapper mapper;

        public TransactionService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }

        public async Task<List<TransactionModel>> GetAllTransactionsAsync(CancellationToken cancellationToken)
        {
            var transactions = await _context.Transactions
                .Include(x=> x.SourceClientBankAccount)
                .Include(x=> x.DestinationClientBankAccount)
                .ToListAsync(cancellationToken);

            var transactionmodel = mapper.Map<List<TransactionModel>>(transactions);
            return transactionmodel;
        }
        public async Task<TransactionModel> GetTransactionById(Guid id, CancellationToken cancellationToken)
        {
            var transaction = await _context.Transactions
                .Where(x => x.Id == id)
                .Include(x=> x.SourceClientBankAccount)
                .Include(x=> x.DestinationClientBankAccount)
                .FirstOrDefaultAsync(cancellationToken);

            if (transaction == null)
            {
                throw new AppBadDataException();
            }
            else
            {
                var model = mapper.Map<TransactionModel>(transaction);
                return model;
            }

        }
        public async Task<TransactionModel> GetByAccountNumberAsync(string accountNumber, CancellationToken cancellationToken)
        {
            var client = await _context.Transactions
               .Where(x => x.SourceClientBankAccount.AccountNumberGeneratedID == accountNumber)
                .FirstOrDefaultAsync(cancellationToken);
            if (client == null)
            {
                throw new AppBadDataException();
            }
            else
            {
                await _context.SaveChangesAsync(cancellationToken);
                var model = mapper.Map<TransactionModel>(client);
                return model;
            }
        }

        public async Task<TransactionModel> CreateOrEditTransaction(TransactionModel model, CancellationToken cancellationToken)
        {

            ClientBankAccount? sourceAccount = null;
            ClientBankAccount? destinationAccount = null;

            decimal prevousAmount = 0;
            TranType? previousType = null;

            if (!string.IsNullOrEmpty(model.SourceClientBankAccount))
            {
                sourceAccount = await _context.ClientBankAccounts
                    .FirstOrDefaultAsync(a => a.AccountNumberGeneratedID == model.SourceClientBankAccount, cancellationToken);
               // if (sourceAccount == null)
                //{
                  //  throw new Exception("Source account not found.");
               // }
            }

            if (!string.IsNullOrEmpty(model.DestinationClientBankAccount))
            {
                destinationAccount = await _context.ClientBankAccounts
                    .FirstOrDefaultAsync(a => a.AccountNumberGeneratedID == model.DestinationClientBankAccount, cancellationToken);
              //  if (destinationAccount == null)
                //{
               //     throw new Exception("Destination account not found.");
               // }
            }

            var existingTransaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == model.Id, cancellationToken);

            if (existingTransaction != null) 
            {
                prevousAmount = existingTransaction.TransactionAmount;
                previousType = existingTransaction.TransactionType;
                existingTransaction.TransactionAmount = model.TransactionAmount;
                existingTransaction.TransactionType = model.TransactionType;
                existingTransaction.SourceClientBankAccountId = sourceAccount?.Id;
                existingTransaction.DestinationClientBankAccountId = destinationAccount?.Id;
                existingTransaction.TransactionStatus = TranStatus.Success;
                existingTransaction.TransactionDateUpdated = DateTime.UtcNow;

                model = mapper.Map<TransactionModel>(existingTransaction);
            }
            else
            {
                var transaction = mapper.Map<Transaction>(model);
                transaction.TransactionDate = DateTime.UtcNow;
                transaction.TransactionDateUpdated = DateTime.UtcNow;
                transaction.SourceClientBankAccountId = sourceAccount?.Id;
                transaction.DestinationClientBankAccountId = destinationAccount?.Id;
                transaction.TransactionStatus = TranStatus.Success;
                _context.Transactions.Add(transaction);
                model = mapper.Map<TransactionModel>(transaction);
            }

            switch (model.TransactionType)
            {
                case TranType.Deposit:
                    if (destinationAccount == null)
                        throw new Exception("Destination account is required for a deposit.");

                    destinationAccount.CurrentBalance += model.TransactionAmount;
                    destinationAccount.DateLastUpdated = DateTime.UtcNow;
                    _context.ClientBankAccounts.Update(destinationAccount);
                    break;

                case TranType.WithDrawal:
                    
                    if (sourceAccount == null)
                        throw new Exception("Source account is required for a withdrawal.");

                    if (sourceAccount.CurrentBalance < model.TransactionAmount)
                        throw new Exception("Insufficient funds for withdrawal.");

                    sourceAccount.CurrentBalance -= model.TransactionAmount;
                    sourceAccount.DateLastUpdated = DateTime.UtcNow;
                    break;

                case TranType.Transfer:
                    if (sourceAccount == null || destinationAccount == null)
                        throw new Exception("Both source and destination accounts are required for a transfer.");

                    if (sourceAccount.CurrentBalance < model.TransactionAmount)
                        throw new Exception("Insufficient funds for transfer.");

                    sourceAccount.CurrentBalance -= model.TransactionAmount;
                    destinationAccount.CurrentBalance += model.TransactionAmount;
                    sourceAccount.DateLastUpdated = DateTime.UtcNow;
                    destinationAccount.DateLastUpdated = DateTime.UtcNow;
                    break;

                default:
                    throw new Exception("Invalid transaction type.");
            }
            if (previousType != null)
            {
                switch (previousType)
                {
                    case TranType.Deposit:

                        destinationAccount.CurrentBalance -= prevousAmount;
                        destinationAccount.DateLastUpdated = DateTime.UtcNow;
                        break;

                    case TranType.WithDrawal:

                        sourceAccount.CurrentBalance += prevousAmount;
                        sourceAccount.DateLastUpdated = DateTime.UtcNow;
                        break;

                    case TranType.Transfer:

                        sourceAccount.CurrentBalance += prevousAmount;
                        destinationAccount.CurrentBalance -= prevousAmount;
                        sourceAccount.DateLastUpdated = DateTime.UtcNow;
                        destinationAccount.DateLastUpdated = DateTime.UtcNow;
                        break;
                }
            }

            await _context.SaveChangesAsync(cancellationToken);
            return model;
        }



        private async Task RevertTransaction(Transaction transaction, CancellationToken cancellationToken)
        {
            ClientBankAccount sourceAccount = null;
            ClientBankAccount destinationAccount = null;

            if (transaction.SourceClientBankAccountId != null)
            {
                sourceAccount = await _context.ClientBankAccounts
                    .FirstOrDefaultAsync(a => a.Id == transaction.SourceClientBankAccountId, cancellationToken);
            }

            if (transaction.DestinationClientBankAccountId != null)
            {
                destinationAccount = await _context.ClientBankAccounts
                    .FirstOrDefaultAsync(a => a.Id == transaction.DestinationClientBankAccountId, cancellationToken);
            }

            switch (transaction.TransactionType)
            {
                case TranType.Deposit:
                    if (destinationAccount != null)
                    {
                        destinationAccount.CurrentBalance -= transaction.TransactionAmount;
                        destinationAccount.DateLastUpdated = DateTime.UtcNow;
                        _context.ClientBankAccounts.Update(destinationAccount);
                    }
                    break;

                case TranType.WithDrawal:
                    if (sourceAccount != null)
                    {
                        sourceAccount.CurrentBalance += transaction.TransactionAmount;
                        sourceAccount.DateLastUpdated = DateTime.UtcNow;
                        _context.ClientBankAccounts.Update(sourceAccount);
                    }
                    break;

                case TranType.Transfer:
                    if (sourceAccount != null && destinationAccount != null)
                    {
                        sourceAccount.CurrentBalance += transaction.TransactionAmount;
                        destinationAccount.CurrentBalance -= transaction.TransactionAmount;
                        sourceAccount.DateLastUpdated = DateTime.UtcNow;
                        destinationAccount.DateLastUpdated = DateTime.UtcNow;

                        _context.ClientBankAccounts.Update(sourceAccount);
                        _context.ClientBankAccounts.Update(destinationAccount);
                    }
                    break;
            }

            await _context.SaveChangesAsync(cancellationToken);
        }
        public async Task DeleteTransaction(Guid id, CancellationToken cancellationToken)
        {
            var transaction = await _context.Transactions
                 .Where(x => x.Id == id)
                 .FirstOrDefaultAsync(cancellationToken);

            if (transaction != null)
            {
                _context.Transactions.Remove(transaction);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
