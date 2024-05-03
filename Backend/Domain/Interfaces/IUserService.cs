using Domain.Models;

namespace Domain.Interfaces
{
    public interface IUserService
    {
        Task<UserModel> GetUserById(Guid userId, CancellationToken cancellationToken);
        Task<List<UserModel>> GetAllUsersAsync(CancellationToken cancellationToken);
        Task DeleteUser(Guid userId, CancellationToken cancellationToken);
        Task<UserModel> AddOrEditUserAsync(UserModel model, CancellationToken cancellationToken);
    }
}
