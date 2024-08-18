namespace Domain.Models
{
    public class ClientBankAccountModel
    {
        public Guid? Id { get; set; }
        public string? AccountNumberGeneratedID { get; set; } = default!;
        public Guid? ClientId { get; set; }
        public Guid BankAccountId { get; set; }
        public Guid BranchId { get; set; }
        public Guid? UserId { get; set; } = default!;
        public string? UserName { get; set; } = default!;
        public string? PersonalNumber { get; set; }
        public decimal CurrentBalance { get; set; } = default!;
        public DateTime? DateCreated { get; set; } = default!;
        public DateTime? DateLastUpdated { get; set; } = default!;
    }
}
