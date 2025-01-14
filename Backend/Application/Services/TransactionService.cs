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
                .Include(x => x.SourceClientBankAccount)
                .ThenInclude(x => x.ClientBankAccount)
                .Include(x => x.DestinationClientBankAccount)
                .ThenInclude(x => x.ClientBankAccount)
                .Include(x=> x.User)
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
                .Include(x => x.DestinationClientBankAccount).ThenInclude(x => x.ClientBankAccount)
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
                .Where(x => x.SourceClientBankAccount.ClientBankAccount.AccountNumberGeneratedID == accountNumber)
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

            var sourceAccount = await _context.CreditCards
                .Include(x=> x.ClientBankAccount)
              .FirstOrDefaultAsync(a => a.ClientBankAccount.AccountNumberGeneratedID == model.SourceClientBankAccount, cancellationToken);

            var destinationAccount = await _context.CreditCards
                 .Include(x => x.ClientBankAccount)
                .FirstOrDefaultAsync(a => a.ClientBankAccount.AccountNumberGeneratedID == model.DestinationClientBankAccount, cancellationToken);
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

                            destinationAccount.ClientBankAccount.CurrentBalance += difference;
                            destinationAccount.ClientBankAccount.DateLastUpdated = DateTime.Now;
                            break;

                        case TransactionType.WithDrawal:

                            sourceAccount.ClientBankAccount.CurrentBalance -= difference;
                            sourceAccount.ClientBankAccount.DateLastUpdated = DateTime.Now;
                            break;
                        case TransactionType.Transfer:
                            sourceAccount.ClientBankAccount.CurrentBalance -= difference;
                            destinationAccount.ClientBankAccount.CurrentBalance += difference;
                            sourceAccount.ClientBankAccount.DateLastUpdated = DateTime.Now;
                            destinationAccount.ClientBankAccount.DateLastUpdated = DateTime.Now;
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
