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
    public class TypesOfCreditCardsService : ITypesOfCreditCardsService
    {
        public readonly AppDbContext appDbContext;
        private readonly IMapper _mapper;

        public TypesOfCreditCardsService(AppDbContext appDbContext, IMapper _mapper)
        {
            this.appDbContext = appDbContext;
            this._mapper = _mapper;
        }

        public async Task<List<TypesOfCreditCardsModel>> GetAllTypesOfCreditCards(CancellationToken cancellationToken)
        {
            var card = await appDbContext.TypesOfCreditCards.ToListAsync(cancellationToken);
            var cardModel = _mapper.Map<List<TypesOfCreditCardsModel>>(card);
            return cardModel;

        }
        public async Task<TypesOfCreditCardsModel> CreateOrUpdateTypesOfCreditCards(TypesOfCreditCardsModel model, CancellationToken cancellationToken)
        {
            if (model.Id == null || model.Id == Guid.Empty)
            {
                var newCard = new TypesOfCreditCards()
                {
                    Name = model.Name,
                    Description = model.Description
                };
                await appDbContext.TypesOfCreditCards.AddAsync(newCard, cancellationToken);
                await appDbContext.SaveChangesAsync(cancellationToken);

                return new TypesOfCreditCardsModel
                {
                    Id = newCard.Id,
                    Name = newCard.Name,
                    Description = newCard.Description
                };
            }
            else
            {
                var existingCard = await appDbContext.TypesOfCreditCards.FindAsync(model.Id);
                if (existingCard == null)
                {
                    throw new AppBadDataException();
                }
                existingCard.Name = model.Name;
                existingCard.Description = model.Description;

                await appDbContext.SaveChangesAsync(cancellationToken);

                return new TypesOfCreditCardsModel
                {
                    Id = model.Id,
                    Name = model.Name,
                    Description = model.Description
                };
            }
        }

        public async Task<List<ListItemModel>> GetTypesOfCreditCardsSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await appDbContext.TypesOfCreditCards
                .Select(x => new ListItemModel()
                {
                    Id = x.Id,
                    Name = x.Name
                }).ToListAsync(cancellationToken);

            return model;

        }
        public async Task<TypesOfCreditCardsModel> GetTypesOfCreditCardsById(Guid id, CancellationToken cancellationToken)
        {
            var card = await appDbContext.TypesOfCreditCards
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
            if (card == null)
            {
                throw new AppBadDataException();
            }
            else
            {
                await appDbContext.SaveChangesAsync(cancellationToken);
                var model = _mapper.Map<TypesOfCreditCardsModel>(card);
                return model;
            }
        }

        public async Task DeleteTypesOfCreditCards(Guid id, CancellationToken cancellationToken)
        {
            var card = await appDbContext.TypesOfCreditCards
                 .Where(x => x.Id == id)
                 .FirstOrDefaultAsync(cancellationToken);

            if (card == null)
            {
                throw new ApplicationException("This Type of Bank Account does not exist.");
            }
            appDbContext.TypesOfCreditCards.Remove(card);
            await appDbContext.SaveChangesAsync();
        }

    }
}
