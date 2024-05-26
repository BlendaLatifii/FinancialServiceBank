namespace Domain.Models
{
    public class ClientBankAccountModel
    {
        public Guid? Id { get; set; }
        public string? AccountNumberGeneratedID { get; set; } = default!;
        public Guid? ClientId { get; set; }
        public Guid BankAccountId { get; set; }
        public string? PersonalNumber { get; set; }
        public decimal CurrentBalance { get; set; } = default!;
        public DateTime? DateCreated { get; set; } = default!;
        public DateTime? DateLastUpdated { get; set; } = default!;
    }
}
