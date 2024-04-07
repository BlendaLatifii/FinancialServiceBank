
namespace Domain.Models
{
    public class RegisterModel
    { 
       public string UserName { get; set; } = default!;

        public string? LastName { get; set; } = default!;

        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
    }
}
