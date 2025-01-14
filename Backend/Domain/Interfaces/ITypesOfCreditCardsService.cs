using Domain.Entities;
using Domain.Models;

namespace Domain.Interfaces
{
    public interface ITypesOfCreditCardsService
    {
       Task<List<TypesOfCreditCardsModel>> GetAllTypesOfCreditCards(CancellationToken cancellationToken);
       Task<TypesOfCreditCardsModel> CreateOrUpdateTypesOfCreditCards(TypesOfCreditCardsModel model, CancellationToken cancellationToken);
       Task<TypesOfCreditCardsModel> GetTypesOfCreditCardsById(Guid id, CancellationToken cancellationToken);
       Task<List<ListItemModel>> GetTypesOfCreditCardsSelectListAsync(CancellationToken cancellationToken);
       Task DeleteTypesOfCreditCards(Guid id, CancellationToken cancellationToken);
    }
}

