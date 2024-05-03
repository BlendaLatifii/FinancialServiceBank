using Domain.Enums;

namespace Domain.Models
{
    public class UserModel
    {
        public Guid? Id { get;set; }
        public string Email { get; set; } = default!;
        public string UserName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string? Password { get; set; } = default!;
        public Role? Role { get; set; } = default!;
    }
}
