using Domain.Models;

namespace Domain.Interfaces
{
    public interface IClientBankAccountService
    {
        Task<List<ClientBankAccountModel>> GetAllClientBankAccountAsync(CancellationToken cancellationToken);
        Task<ClientBankAccountModel> GetClientAccountById(Guid Id, CancellationToken cancellationToken);
        Task DeleteClientBankAccount(Guid Id, CancellationToken cancellationToken);
        Task<List<ListItemModel>> GetClientAccountsSelectListAsync(CancellationToken cancellationToken);
        Task<int> GetClientBankAccountCount(CancellationToken cancellationToken);
        Task DeductMaintenanceFeesAfterAMonth(CancellationToken cancellationToken);
        Task<List<string>> GetStudentAccountClientsAsync(CancellationToken cancellationToken);
        Task<List<ClientBankAccountModel>> GetByPersonalNumberAsync(string personalNumber, CancellationToken cancellationToken);
        Task<ClientBankAccountModel> CreateOrUpdateClientBankAccount(ClientBankAccountModel model, CancellationToken cancellationToken);
    }
}
