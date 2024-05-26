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
			if (model.Id == null || model.Id == Guid.Empty)
			{
				var newCard = new CreditCards()
				{
					CVV = model.CVV,
					AccountNumber = model.AccountNumber
				};
				await appDbContext.CreditCards.AddAsync(newCard, cancellationToken);
				await appDbContext.SaveChangesAsync(cancellationToken);

				return new CreditCardsModel
				{
					Id = newCard.Id,
					CVV = newCard.CVV,
					AccountNumber = newCard.AccountNumber
				};
			}
			else
			{
				var existingCard = await appDbContext.CreditCards.FindAsync(model.Id);
				if (existingCard == null)
				{
					throw new AppBadDataException();
				}
				existingCard.CVV = model.CVV;
				existingCard.AccountNumber = model.AccountNumber;

				await appDbContext.SaveChangesAsync(cancellationToken);

				return new CreditCardsModel
				{
					Id = model.Id,
					CVV = model.CVV,
					AccountNumber = model.AccountNumber
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
				await appDbContext.SaveChangesAsync(cancellationToken);
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