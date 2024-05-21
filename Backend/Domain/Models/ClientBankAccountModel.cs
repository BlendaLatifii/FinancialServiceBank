namespace Domain.Models
{
    public class ClientBankAccountModel
    {
        public Guid? Id { get; set; }
        public string AccountNumberGeneratedID { get; set; }
        public Guid ClientId { get; set; }
        public Guid AccountId { get; set; }
        public decimal CurrentBalance { get; set; } = default!;

        public DateTime DateCreated { get; set; } = default!;
        public DateTime DateLastUpdated { get; set; } = default!;
    }
}
