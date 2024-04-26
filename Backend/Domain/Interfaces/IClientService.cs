using Domain.Entities;
using Domain.Models;

namespace Domain.Interfaces
{
    public interface IClientService
    {
        Task<List<ClientModel>> GetAllClientAsync(CancellationToken cancellationToken);
        Task GetByIdAsync (int ClientID, CancellationToken cancellationToken);
        Task DeleteClient(int ClientID, CancellationToken cancellationToken);
	}
}
