using Domain.Enums;
namespace Domain.Models
{
    public class TransactionModel
    {
        public Guid? Id { get; set; }
        public Guid? UserId { get; set; } = default!;
        public string? UserName { get; set; } = default!;
        public decimal TransactionAmount { get; set; }
        public Guid? SourceClientBankAccountId { get; set; }
        public Guid? DestinationClientBankAccountId { get; set; }
        public string? SourceClientBankAccount { get; set; }
        public string? DestinationClientBankAccount { get; set; }
        public TranType TransactionType { get; set; }
        public DateTime? TransactionDate { get; set; }
        public DateTime? TransactionDateUpdated { get; set; }
    }
}
