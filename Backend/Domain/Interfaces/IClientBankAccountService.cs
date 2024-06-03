using Domain.Models;

namespace Domain.Interfaces
{
    public interface IClientBankAccountService
    {
        Task<List<ClientBankAccountModel>> GetAllClientBankAccountAsync(CancellationToken cancellationToken);
        Task<ClientBankAccountModel> GetClientAccountById(Guid Id, CancellationToken cancellationToken);
        Task DeleteClientBankAccount(Guid Id, CancellationToken cancellationToken);
        Task DeductMaintenanceFeesAfterAMonth(CancellationToken cancellationToken);
        Task<ClientBankAccountModel> GetByPersonalNumberAsync(string personalNumber, CancellationToken cancellationToken);
        Task<ClientBankAccountModel> CreateOrUpdateClientBankAccount(ClientBankAccountModel model, CancellationToken cancellationToken);
    }
}
