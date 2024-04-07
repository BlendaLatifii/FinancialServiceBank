using Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace Domain.Interfaces
{
    public interface IAccountService
    {
        Task<IdentityResult> Register(RegisterModel registerModel , CancellationToken cancellationToken);
        Task<UserModel> Login(LoginModel loginModel, CancellationToken cancellationToken);
    }
}
