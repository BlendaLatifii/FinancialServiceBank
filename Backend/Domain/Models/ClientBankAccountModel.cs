namespace Domain.Models
{
    public class ClientBankAccountModel
    {
        public string? AccountNumberGeneratedID { get; set; }
        public int PersonalNumberID { get; set; }
        public Guid Id { get; set; }
        public decimal CurrentBalance { get; set; } = default!;

        public DateTime DateCreated { get; set; } = default!;
        public DateTime DateLastUpdated { get; set; } = default!;
    }
}
