using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class TransactionService : ITransactionService
    {
        public readonly AppDbContext _context;
        private readonly IMapper mapper;
        private readonly IAuthorizationManager _authorizationManager;

        public TransactionService(AppDbContext context, IMapper mapper, IAuthorizationManager authorizationManager)
        {
            _context = context;
            this.mapper = mapper;
            _authorizationManager = authorizationManager;
        }

        public async Task<List<TransactionModel>> GetAllTransactionsAsync(CancellationToken cancellationToken)
        {
            var transactions = await _context.Transactions
                .Include(x => x.User)
                .Include(x => x.SourceClientBankAccount)
                .Include(x => x.DestinationClientBankAccount)
                .ToListAsync(cancellationToken);

            var transactionmodel = mapper.Map<List<TransactionModel>>(transactions);
            return transactionmodel;
        }
        public async Task<int> CountAllAccountsAsync(CancellationToken cancellationToken)
        {
            // Kthe numrin e të gjitha llogarive
            return await _context.Transactions.CountAsync(cancellationToken);
        }
        public async Task<TransactionModel> GetTransactionById(Guid id, CancellationToken cancellationToken)
        {
            var transaction = await _context.Transactions
                .Where(x => x.Id == id)
                .Include(x => x.User)
                .Include(x => x.SourceClientBankAccount)
                .Include(x => x.DestinationClientBankAccount)
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
       public async Task<List<TransactionModel>> GetByAccountNumberAsync(string accountNumber, CancellationToken cancellationToken)
        {
            var clientAccounts = await _context.Transactions
                .Where(x => x.SourceClientBankAccount.AccountNumberGeneratedID == accountNumber)
                .ToListAsync(cancellationToken);

            if (clientAccounts == null)
            {
                throw new AppBadDataException();
            }
            else
            {
                await _context.SaveChangesAsync(cancellationToken);
                var models = clientAccounts.Select(client => mapper.Map<TransactionModel>(client)).ToList();
                return models;
            }
        }
        /* public async Task<TransactionModel> CreateOrEditTransaction(TransactionModel model, CancellationToken cancellationToken)
         {

             Guid? userId = _authorizationManager.GetUserId();

             if (userId is null)
             {
                 throw new UnauthorizedAccessException("User is not authenticated.");
             }

             ClientBankAccount? sourceAccount = null;
             ClientBankAccount? destinationAccount = null;

             decimal prevousAmount = 0;
             TransactionType? previousType = null;

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
                 existingTransaction.TransactionDateUpdated = DateTime.Now;

                 model = mapper.Map<TransactionModel>(existingTransaction);
             }
             else
             {
                 var transaction = mapper.Map<Transaction>(model);
                 transaction.TransactionDate = DateTime.Now;
                 transaction.TransactionDateUpdated = DateTime.Now;
                 transaction.SourceClientBankAccountId = sourceAccount?.Id;
                 transaction.DestinationClientBankAccountId = destinationAccount?.Id;
                 transaction.TransactionStatus = TranStatus.Success;
                 transaction.UserId = userId ?? Guid.Empty;
                 _context.Transactions.Add(transaction);
                 model = mapper.Map<TransactionModel>(transaction);
             }

             switch (model.TransactionType)
             {
                 case TransactionType.Deposit:
                     if (destinationAccount == null)
                         throw new Exception("Destination account is required for a deposit.");
                     destinationAccount.CurrentBalance += model.TransactionAmount;
                     destinationAccount.DateLastUpdated = DateTime.Now;
                     _context.ClientBankAccounts.Update(destinationAccount);
                     break;

                 case TransactionType.WithDrawal:

                     if (sourceAccount == null)
                         throw new Exception("Source account is required for a withdrawal.");

                     if (sourceAccount.CurrentBalance < model.TransactionAmount)
                         throw new Exception("Insufficient funds for withdrawal.");

                     sourceAccount.CurrentBalance -= model.TransactionAmount;
                     sourceAccount.DateLastUpdated = DateTime.Now;
                     break;

                 case TransactionType.Transfer:
                     if (sourceAccount == null || destinationAccount == null)
                         throw new Exception("Both source and destination accounts are required for a transfer.");

                     if (sourceAccount.AccountNumberGeneratedID == destinationAccount.AccountNumberGeneratedID)
                         throw new Exception("Source and destination accounts cannot be the same.");

                     if (sourceAccount.CurrentBalance < model.TransactionAmount)
                         throw new Exception("Insufficient funds for transfer.");

                     sourceAccount.CurrentBalance -= model.TransactionAmount;
                     destinationAccount.CurrentBalance += model.TransactionAmount;
                     sourceAccount.DateLastUpdated = DateTime.Now;
                     destinationAccount.DateLastUpdated = DateTime.Now;
                     break;

                 default:
                     throw new Exception("Invalid transaction type.");
             }
             if (previousType != null)
             {
                 switch (previousType)
                 {
                     case TransactionType.Deposit:

                         destinationAccount.CurrentBalance -= prevousAmount;
                         destinationAccount.DateLastUpdated = DateTime.Now;
                         break;

                     case TransactionType.WithDrawal:

                         sourceAccount.CurrentBalance += prevousAmount;
                         sourceAccount.DateLastUpdated = DateTime.Now;
                         break;

                     case TransactionType.Transfer:

                         sourceAccount.CurrentBalance += prevousAmount;
                         destinationAccount.CurrentBalance -= prevousAmount;
                         sourceAccount.DateLastUpdated = DateTime.Now;
                         destinationAccount.DateLastUpdated = DateTime.Now;
                         break;
                 }
             }

             await _context.SaveChangesAsync(cancellationToken);
             return model;
         }

         */
        public async Task<TransactionModel> CreateOrEditTransaction(TransactionModel model, CancellationToken cancellationToken)
        {
            Guid? userId = _authorizationManager.GetUserId();

            if (userId is null)
            {
                throw new UnauthorizedAccessException("User is not authenticated.");
            }

            decimal prevousAmount = 0;
            TransactionType? previousType = null;
            ITransactionStrategy strategy;
            Transaction transaction;
            var sourceAccount = await _context.ClientBankAccounts
              .FirstOrDefaultAsync(a => a.AccountNumberGeneratedID == model.SourceClientBankAccount, cancellationToken);

            var destinationAccount = await _context.ClientBankAccounts
                .FirstOrDefaultAsync(a => a.AccountNumberGeneratedID == model.DestinationClientBankAccount, cancellationToken);
            if (model.Id == Guid.Empty || model.Id == null)
            {
                switch (model.TransactionType)
                {
                    case TransactionType.Deposit:
                        strategy = new DepositTransactionStrategy(_context);
                        break;
                    case TransactionType.WithDrawal:
                        strategy = new WithdrawalTransactionStrategy(_context);
                        break;
                    case TransactionType.Transfer:
                        strategy = new TransferTransactionStrategy(_context);
                        break;
                    default:
                        throw new Exception("Invalid transaction type.");
                }
                await strategy.ProcessTransactionAsync(model, cancellationToken);
                // If TransactionId is not provided (or is an empty Guid), create a new transaction
                transaction = new Transaction
                {
                    UserId = userId ?? Guid.Empty,
                    TransactionAmount = model.TransactionAmount,
                    SourceClientBankAccountId = sourceAccount?.Id,
                    DestinationClientBankAccountId = destinationAccount?.Id,
                    TransactionStatus = TranStatus.Success,
                    TransactionType = model.TransactionType,
                    TransactionDate = DateTime.Now,
                    TransactionDateUpdated = DateTime.Now
                };

                _context.Transactions.Add(transaction);
            }
            else
            {
                // If TransactionId is provided, update the existing transaction
                transaction = await _context.Transactions
                    .FirstOrDefaultAsync(t => t.Id == model.Id, cancellationToken);

                if (transaction == null)
                {
                    throw new Exception("Transaction not found.");
                }
                prevousAmount = transaction.TransactionAmount;

                // Update the existing transaction's details
                transaction.TransactionAmount = model.TransactionAmount;
                transaction.SourceClientBankAccountId = sourceAccount?.Id;
                transaction.DestinationClientBankAccountId = destinationAccount?.Id;
                transaction.TransactionStatus = TranStatus.Success;
                transaction.TransactionType = model.TransactionType;
                transaction.TransactionDateUpdated = DateTime.Now;
                previousType = transaction.TransactionType;
                decimal difference = model.TransactionAmount - prevousAmount;
                if (previousType != null)
                {
                    switch (previousType)
                    {
                        case TransactionType.Deposit:

                            destinationAccount.CurrentBalance += difference;
                            destinationAccount.DateLastUpdated = DateTime.Now;
                            break;

                        case TransactionType.WithDrawal:

                            sourceAccount.CurrentBalance -= difference;
                            sourceAccount.DateLastUpdated = DateTime.Now;
                            break;
                        case TransactionType.Transfer:
                            sourceAccount.CurrentBalance -= difference;
                            destinationAccount.CurrentBalance += difference;
                            sourceAccount.DateLastUpdated = DateTime.Now;
                            destinationAccount.DateLastUpdated = DateTime.Now;
                            break;
                    }
                }
            }
            await _context.SaveChangesAsync(cancellationToken);

            return model;
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

        public async Task<List<TransactionTypePercentageModel>> GetTransactionTypePercentagesAsync(CancellationToken cancellationToken)
        {
            var totalTransactions = await _context.Transactions.CountAsync(cancellationToken);

            var transactionTypeCounts = await _context.Transactions
                .GroupBy(x => x.TransactionType)
                .Select(g => new TransactionTypePercentageModel
                {
                    TransactionType = g.Key,
                    Count = g.Count(),
                    Percentage = (double)g.Count() / totalTransactions * 100
                })
                .ToListAsync(cancellationToken);

            return transactionTypeCounts;
        }
    }
}
