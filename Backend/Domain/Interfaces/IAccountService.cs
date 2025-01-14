using Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace Domain.Interfaces
{
    public interface IAccountService
    {
        Task<IdentityResult> Register(RegisterModel registerModel , CancellationToken cancellationToken);
        Task<AuthenticationModel> LoginAsync(LoginModel loginModel, CancellationToken cancellationToken);
        Task<AuthenticationModel> RefreshTokenAsync( TokenRequestModel tokenRequest);
        Task<UserModel> GetUserById(Guid userId, CancellationToken cancellationToken);
        Task<List<UserModel>> GetAllUsersAsync(CancellationToken cancellationToken);
        Task<List<ListItemModel>> GetUsersSelectListAsync(CancellationToken cancellationToken);
        Task DeleteUser(Guid userId, CancellationToken cancellationToken);
        Task<UserModel> AddOrEditUserAsync(UserModel model, CancellationToken cancellationToken);
    }
}
