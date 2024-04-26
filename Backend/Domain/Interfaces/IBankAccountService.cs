using Domain.Entities;
using Domain.Models;

namespace Domain.Interfaces
{
    public interface IBankAccountService
    {
       Task <List<BankAccountModel>> GetAllBankAccountsAsync(CancellationToken cancellationToken);
       Task GetBankAccountById(string AccountTypeID, CancellationToken cancellationToken);
        Task DeleteAccount(string BankAccountID, CancellationToken cancellationToken);
    }
}
