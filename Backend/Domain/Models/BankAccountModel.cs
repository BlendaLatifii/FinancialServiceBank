
using Domain.Entities;

namespace Domain.Models
{
    public class BankAccountModel
    {
        public Guid? Id { get; set; }
        public Guid? UserId { get; set; } = default!;
        public string? UserName { get; set; } = default!;
        public string AccountType { get; set; } = default!;
        public string AccountDescription { get; set; } = default!;
        public string TarifaMirembajtese { get; set; } = default!;
    }
}