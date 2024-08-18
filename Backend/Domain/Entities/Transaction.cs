using Domain.Enums;

namespace Domain.Entities
{
    public  class Transaction
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public decimal TransactionAmount { get; set; }
        public TranStatus TransactionStatus { get; set; }
        public Guid? SourceClientBankAccountId { get; set; }
        public Guid? DestinationClientBankAccountId { get; set; }
        public TranType TransactionType { get; set; }
        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
        public DateTime TransactionDateUpdated { get; set; } = DateTime.UtcNow;

        public User User{ get; set; } = default!;
        public ClientBankAccount? SourceClientBankAccount { get; set; } = default!;
        public ClientBankAccount? DestinationClientBankAccount { get; set; } = default!;
    }
}
