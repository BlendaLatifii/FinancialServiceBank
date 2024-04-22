using Domain.Entities;
using Domain.Models;

namespace Domain.Interfaces
{
    public interface IClientService
    {
        Task<List<ClientModel>> GetAllClientAsync(CancellationToken cancellationToken);
        Task GetByIdAsync (int ClientID, CancellationToken cancellationToken);
       // Task AddClient(Client client);
       // Task GetClientByPersonalNumber (int PersonalNumber, CancellationToken cancellationToken);
       // Task UpdateClient (ClientModel client);
        Task DeleteClient(int ClientID, CancellationToken cancellationToken);
	}
}
