using System;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class Loan
    {
        public Guid Id { get; set; }
        public Guid ClientBankAccountId { get; set; }
        public LoanType LoansTypesId { get; set; }
        public string LoanAmount { get; set; }
        public double InterestRate { get; set; } = 0.9;
        public string MonthlyPayment { get; set; }
        public string LoanPeriod { get; set; } 
        public string Income { get; set; }
        public EmploymentStatus EmploymentStatus { get; set; }
        public LoanType LoanType { get; set; }
        public ClientBankAccount ClientBankAccount { get; set; } = default!;
        
    }
}
