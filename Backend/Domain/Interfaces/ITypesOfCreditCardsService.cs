using Domain.Entities;
using Domain.Models;

namespace Domain.Interfaces
{
    public interface ITypesOfCreditCardsService
    {
        Task<List<TypesOfCreditCardsModel>> GetAllTypesOfCreditCards(CancellationToken cancellationToken);
        Task<TypesOfCreditCardsModel> CreateOrUpdateTypesOfCreditCards(TypesOfCreditCardsModel model, CancellationToken cancellationToken);
        Task<TypesOfCreditCardsModel> GetTypesOfCreditCardsById(int id, CancellationToken cancellationToken);
        Task<List<ListItemIntModel>> GetTypesOfCreditCardsSelectListAsync(CancellationToken cancellationToken);
        Task DeleteTypesOfCreditCards(int id, CancellationToken cancellationToken);
    }
}

