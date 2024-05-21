using Domain.Entities;
using Domain.Models;

namespace Domain.Interfaces
{
    public interface IClientService
    {
        Task<List<ClientModel>> GetAllClientAsync(CancellationToken cancellationToken);
        Task<ClientModel> GetByIdAsync (Guid id, CancellationToken cancellationToken);
        Task<ClientModel> CreateOrUpdateClientAsync(ClientModel model, CancellationToken cancellationToken);
        Task DeleteClient(Guid Id, CancellationToken cancellationToken);
	}
}
