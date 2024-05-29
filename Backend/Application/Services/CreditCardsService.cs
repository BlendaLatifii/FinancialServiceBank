using AutoMapper;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Xml.Linq;

namespace Application.Services
{
	public class CreditCardsService : ICreditCardsService
	{
		public readonly AppDbContext appDbContext;
		private readonly IMapper _mapper;

		public CreditCardsService(AppDbContext appDbContext, IMapper _mapper)
		{
			this.appDbContext = appDbContext;
			this._mapper = _mapper;
		}

		public async Task<List<CreditCardsModel>> GetAllCreditCards(CancellationToken cancellationToken)
		{
			var card = await appDbContext.CreditCards.ToListAsync(cancellationToken);
			var cardModel = _mapper.Map<List<CreditCardsModel>>(card);
			return cardModel;

		}
		public async Task<CreditCardsModel> CreateOrUpdateCreditCards(CreditCardsModel model, CancellationToken cancellationToken)
		{
			var clientAccount = await appDbContext.ClientBankAccounts.FirstOrDefaultAsync(x => x.AccountNumberGeneratedID == model.ClientAccountNumber, cancellationToken);
			if (clientAccount == null)
			{
				throw new Exception("Client not found with the provided Account Number.");
			}
			if (model.Id == null || model.Id == Guid.Empty)
			{
				var newCard = new CreditCards()
				{
					ClientBankAccountId = model.ClientBankAccountId
				};
				await appDbContext.CreditCards.AddAsync(newCard, cancellationToken);
				await appDbContext.SaveChangesAsync(cancellationToken);

				return new CreditCardsModel
				{
					Id = newCard.Id,
					ClientBankAccountId = newCard.ClientBankAccountId
				};
			}
			else
			{
				var existingCard = await appDbContext.CreditCards.FindAsync(model.Id);
				if (existingCard == null)
				{
					throw new AppBadDataException();
				}
				existingCard.ClientBankAccountId = model.ClientBankAccountId;

				await appDbContext.SaveChangesAsync(cancellationToken);

				return new CreditCardsModel
				{
					Id = model.Id,
					CVV = model.CVV,
					ClientBankAccountId = model.ClientBankAccountId
				};
			}
		}
		public async Task<CreditCardsModel> GetCreditCardsById(Guid id, CancellationToken cancellationToken)
		{
			var card = await appDbContext.CreditCards
				.Where(x => x.Id == id)
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

		public async Task DeleteCreditCards(Guid id, CancellationToken cancellationToken)
		{
			var card = await appDbContext.CreditCards
				 .Where(x => x.Id == id)
				 .FirstOrDefaultAsync(cancellationToken);

			if (card == null)
			{
				throw new ApplicationException("This Type of Credit Card does not exist.");
			}
			appDbContext.CreditCards.Remove(card);
			await appDbContext.SaveChangesAsync();
		}

	}
}