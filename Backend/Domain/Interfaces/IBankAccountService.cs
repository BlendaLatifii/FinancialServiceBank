using Domain.Entities;
using Domain.Models;

namespace Domain.Interfaces
{
    public interface IBankAccountService
    {
       // Task <List<BankAccountModel>> GetAllBankAccountsAsync(CancellationToken cancellationToken);
       // Task GetByIdAsync(int BankAccountID, CancellationToken cancellationToken);
        Task <BankAccount> GetByAccountNumber(string BankAccountNumber, CancellationToken cancellationToken);
        Task CreateBankAccount (BankAccount bankAccount);
        Task UpdateBankAccount(BankAccount bankAccount);
        Task DeleteAccount(int BankAccountID, CancellationToken cancellationToken);
    }
}
