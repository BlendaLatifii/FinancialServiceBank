using Domain.Entities;
using Domain.Models;


namespace Domain.Interfaces
{
	public interface ICreditCardsService
	{
		Task<List<CreditCardsModel>> GetAllCreditCards(CancellationToken cancellationToken);
		Task<int> GetCreditCardsCount(CancellationToken cancellationToken);
		Task<CreditCardsModel> CreateOrUpdateCreditCards(CreditCardsModel model, CancellationToken cancellationToken);
		Task<CreditCardsModel> GetCreditCardsById(Guid id, CancellationToken cancellationToken);
		Task<CreditCardsModel> GetByAccountNumberAsync(string accountNumber, CancellationToken cancellationToken);
		Task DeleteCreditCards(Guid id, CancellationToken cancellationToken);
	}
}