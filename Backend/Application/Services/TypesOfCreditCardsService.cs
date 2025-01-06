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
    public class TypesOfCreditCardsService : ITypesOfCreditCardsService
    {
        public readonly AppDbContext appDbContext;
        private readonly IMapper _mapper;
        private readonly IAuthorizationManager _authorizationManager;

        public TypesOfCreditCardsService(AppDbContext appDbContext, IAuthorizationManager authorizationManager, IMapper _mapper)
        {
            this.appDbContext = appDbContext;
            this._mapper = _mapper;
            _authorizationManager = authorizationManager;
        }

        public async Task<List<TypesOfCreditCardsModel>> GetAllTypesOfCreditCards(CancellationToken cancellationToken)
        {
            var card = await appDbContext.TypesOfCreditCards.Include(x=>x.User).ToListAsync(cancellationToken);
            var cardModel = _mapper.Map<List<TypesOfCreditCardsModel>>(card);
            return cardModel;

        }
        public async Task<TypesOfCreditCardsModel> CreateOrUpdateTypesOfCreditCards(TypesOfCreditCardsModel model, CancellationToken cancellationToken)
        {
            Guid? userId = _authorizationManager.GetUserId();

            if (userId is null)
            {
                throw new UnauthorizedAccessException("User is not authenticated.");
            }
            TypesOfCreditCards typesOfCreditCards = new TypesOfCreditCards();
            if (model.Id == null )
            {
                /* var newCard = new TypesOfCreditCards()
                 {
                     Name = model.Name,
                     Description = model.Description,
                   */
                typesOfCreditCards.UserId = userId ?? Guid.Empty;
                //};
               await appDbContext.TypesOfCreditCards.AddAsync(typesOfCreditCards, cancellationToken);
              //  await appDbContext.SaveChangesAsync(cancellationToken);

              //  return await GetTypesOfCreditCardsById(newCard.Id, cancellationToken);
            }
            else
            {
                typesOfCreditCards = await appDbContext.TypesOfCreditCards.FindAsync(model.Id);
               /* if (existingCard == null)
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
                */

            }
            typesOfCreditCards.Name = model.Name;
            typesOfCreditCards.Description = model.Description;
            await appDbContext.SaveChangesAsync(cancellationToken);
            return await GetTypesOfCreditCardsById(typesOfCreditCards.Id, cancellationToken);
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
                .Include(x => x.User)
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
                throw new ApplicationException("This Type of Credit Cards does not exist.");
            }
            appDbContext.TypesOfCreditCards.Remove(card);
            await appDbContext.SaveChangesAsync();
        }

    }
}
