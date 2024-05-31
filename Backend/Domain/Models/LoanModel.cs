using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class LoanModel
    {
        public Guid Id { get; set; }
        public Guid? ClientBankAccountId { get; set; }
        public Guid LoansTypesId { get; set; }
        public string ClientAccountNumber { get; set; } = default!;
        public string LoanAmount { get; set; } = default!;
        public decimal? InterestRate { get; set; }
        public string MonthlyPayment { get; set; } = default!;
        public int? LoanPeriod { get; set; }
        public string Income { get; set; } = default!;
        public decimal? LoanInstallment { get; set; }
        public string EmploymentStatus { get; set; } = default!;

    }
}