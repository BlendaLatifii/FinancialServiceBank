using Domain.Models;

namespace Domain.Interfaces
{
    public interface IClientBankAccountService
    {
        Task<List<ClientBankAccountModel>> GetAllClientBankAccountAsync(CancellationToken cancellationToken);
        Task<ClientBankAccountModel> GetClientAccountById(Guid Id, CancellationToken cancellationToken);
        Task DeleteClientBankAccount(Guid Id, CancellationToken cancellationToken);
        Task<ClientBankAccountModel> CreateOrUpdateClientBankAccount(ClientBankAccountModel model, CancellationToken cancellationToken);
    }
}
