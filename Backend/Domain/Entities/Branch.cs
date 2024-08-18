namespace Domain.Entities
{
    public class Branch
    {
        public Guid BranchId { get; set; } = default!;
        public Guid UserId { get; set; } = default!;
        public string BranchName { get; set; } = default!;
        public string Address { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string Opened { get; set; } = default!;
        public User User { get; set; } = default!;
        public List<ClientBankAccount> ClientBankAccounts { get; set; }
    }
}
