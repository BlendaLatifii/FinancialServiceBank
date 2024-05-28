using Domain.Models;

namespace Domain.Interfaces
{
    public interface ITransactionService
    {
        Task<List<TransactionModel>> GetAllTransactionsAsync(CancellationToken cancellationToken);
        Task<TransactionModel> GetTransactionById(Guid id, CancellationToken cancellationToken);
        Task<TransactionModel> CreateOrEditTransaction(TransactionModel model, CancellationToken cancellationToken);
        Task DeleteTransaction(Guid id, CancellationToken cancellationToken);

    }
}
