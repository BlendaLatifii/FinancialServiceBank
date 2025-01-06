using AutoMapper;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Xml.Linq;

namespace Application.Services
{
    public class CreditCardsService : ICreditCardsService
    {
        public readonly AppDbContext appDbContext;
        private readonly IMapper _mapper;
        private readonly IAuthorizationManager _authorizationManager;

        public CreditCardsService(AppDbContext appDbContext, IMapper _mapper, IAuthorizationManager authorizationManager)
        {
            this.appDbContext = appDbContext;
            this._mapper = _mapper;
            _authorizationManager = authorizationManager;
        }
        public async Task<int> GetCreditCardsCount(CancellationToken cancellationToken)
        {
            return await appDbContext.CreditCards.CountAsync(cancellationToken);
        }

        public async Task<List<CreditCardsModel>> GetAllCreditCards(CancellationToken cancellationToken)
        {
            var card = await appDbContext.CreditCards.Include(x => x.User).Include(x => x.ClientBankAccount).ToListAsync(cancellationToken);
            var cardModel = _mapper.Map<List<CreditCardsModel>>(card);
            return cardModel;

        }
        public async Task<int> CountAllAccountsAsync(CancellationToken cancellationToken)
        {
            return await appDbContext.CreditCards.CountAsync(cancellationToken);
        }
        public async Task<CreditCardsModel> CreateOrUpdateCreditCards(CreditCardsModel model, CancellationToken cancellationToken)
        {
            Guid? userId = _authorizationManager.GetUserId();

            if (userId is null)
            {
                throw new UnauthorizedAccessException("User is not authenticated.");
            }
            var clientAccount = await appDbContext.ClientBankAccounts.FirstOrDefaultAsync(x => x.AccountNumberGeneratedID == model.ClientAccountNumber, cancellationToken);
            if (clientAccount == null)
            {
                throw new Exception("Client not found with the provided Account Number.");
            } 
            if (!model.Id.HasValue)
            {
                var newCard = new CreditCards()
                {
                    ClientBankAccountId = clientAccount.Id,
                    TypesOfCreditCardsID = model.TypesOfCreditCardsID,
                    Limite = model.Limite,
                    Balance=clientAccount.CurrentBalance,
                    UserId= userId ?? Guid.Empty
                    
                };
                if (newCard.Balance > newCard.Limite)
                {
                    throw new Exception("Balance cannot exceed the credit limit.");
                }
                await appDbContext.CreditCards.AddAsync(newCard, cancellationToken);
                await appDbContext.SaveChangesAsync(cancellationToken);

                return await GetCreditCardsById(newCard.Id, cancellationToken);

            }
            else
            {
                var existingCard = await appDbContext.CreditCards.FindAsync(model.Id);
                if (existingCard == null)
                {
                    throw new AppBadDataException();
                }
                existingCard.ClientBankAccountId = clientAccount.Id;
                existingCard.Limite = model.Limite;
                existingCard.TypesOfCreditCardsID = model.TypesOfCreditCardsID;
                if (existingCard.Balance > existingCard.Limite)
                {
                    throw new Exception("Balance cannot exceed the credit limit.");
                }

                await appDbContext.SaveChangesAsync(cancellationToken);

                return new CreditCardsModel
                {
                    Id = existingCard.Id,
                    Cvv = existingCard.Cvv,
                    Balance = existingCard.Balance,
                    ClientBankAccountId = existingCard.ClientBankAccountId,
                    TypesOfCreditCardsID = existingCard.TypesOfCreditCardsID,
                    Limite = existingCard.Limite,
                    ValidThru = existingCard.ValidThru,
                };
            }
        }
        public async Task<CreditCardsModel> GetCreditCardsById(Guid id, CancellationToken cancellationToken)
        {
            var card = await appDbContext.CreditCards
                .Where(x => x.Id == id)
                .Include(x => x.User)
                .Include(x => x.ClientBankAccount)
                .FirstOrDefaultAsync(cancellationToken);
            if (card == null)
            {
                throw new AppBadDataException();
            }
            else
            {
                var model = _mapper.Map<CreditCardsModel>(card);
                return model;
            }
        }
        public async Task<CreditCardsModel> GetByAccountNumberAsync(string accountNumber, CancellationToken cancellationToken)
        {
            var client = await appDbContext.CreditCards
               .Where(x => x.ClientBankAccount.AccountNumberGeneratedID == accountNumber)
                .FirstOrDefaultAsync(cancellationToken);
            if (client == null)
            {
                throw new AppBadDataException();
            }
            else
            {
                await appDbContext.SaveChangesAsync(cancellationToken);
                var model = _mapper.Map<CreditCardsModel>(client);
                return model;
            }
        }

        public async Task DeleteCreditCards(Guid id, CancellationToken cancellationToken)
        {
            var card = await appDbContext.CreditCards
                 .Where(x => x.Id == id)
                 .FirstOrDefaultAsync(cancellationToken);

            if (card == null)
            {
                throw new ApplicationException("This Credit Card does not exist.");
            }
            appDbContext.CreditCards.Remove(card);
            await appDbContext.SaveChangesAsync();
        }

    }
}