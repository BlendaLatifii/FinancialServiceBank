using Domain.Enums;

namespace Domain.Models
{
    public class LoanModel
    {
        public Guid? Id { get; set; }
        public Guid? ClientBankAccountId { get; set; }
        public LoanType LoansTypesId { get; set; }
        public string ClientAccountNumber { get; set; } = default!;
        public string LoanAmount { get; set; } = default!;
        public string Income { get; set; } = default!;
        public EmploymentStatus EmploymentStatus { get; set; } = default!;
        public string? LoanPeriod { get; set; }
        public double? InterestRate { get; set; }
        public string? MonthlyPayment { get; set; }

    }
}