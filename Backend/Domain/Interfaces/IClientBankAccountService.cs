using Domain.Models;

namespace Domain.Interfaces
{
    public interface IClientBankAccountService
    {
        Task<List<ClientBankAccountModel>> GetAllClientBankAccountAsync(CancellationToken cancellationToken);
        Task GetClientAccountById(string AccountNumberGeneratedID, CancellationToken cancellationToken);
        Task DeleteClientBankAccount(string AccountNumberGeneratedID, CancellationToken cancellationToken);
    }
}
