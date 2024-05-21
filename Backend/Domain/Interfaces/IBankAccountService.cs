using Domain.Entities;
using Domain.Models;

namespace Domain.Interfaces
{
    public interface IBankAccountService
    {
        Task <List<BankAccountModel>> GetAllBankAccountsAsync(CancellationToken cancellationToken);
        Task<BankAccountModel> CreateOrUpdateBankAccount(BankAccountModel model, CancellationToken cancellationToken);
        Task<BankAccountModel> GetBankAccountById(Guid id, CancellationToken cancellationToken);
        Task DeleteAccount(Guid id, CancellationToken cancellationToken);
    }
}
