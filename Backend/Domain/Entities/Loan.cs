using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class Loan
    {
        public Guid Id { get; set; }
        public Guid ClientBankAccountId { get; set; }
        public Guid LoansTypesId { get; set; }
        public string LoanAmount { get; set; }
        public decimal InterestRate { get; set; }
        public string MonthlyPayment { get; set; }
        public int LoanPeriod { get; set; }
        public string Income { get; set; }
        public decimal LoanInstallment { get; set; }
        public string EmploymentStatus { get; set; }
        public LoansType LoansTypes { get; set; } = default!;
        public ClientBankAccount ClientBankAccount { get; set; } = default!;

        public Loan()
        {
            if (decimal.TryParse(LoanAmount, out var loanAmount) &&
                decimal.TryParse(MonthlyPayment, out var monthlyPayment))
            {
                InterestRate = CalculateInterestRate(loanAmount, LoanPeriod, monthlyPayment);
                LoanPeriod = CalculateLoanPeriod(loanAmount, monthlyPayment, InterestRate);
                LoanInstallment = CalculateLoanInstallment(loanAmount, InterestRate, LoanPeriod);
            }
            else
            {
                throw new InvalidOperationException("LoanAmount and MonthlyPayment must be valid decimal values.");
            }
        }

        public static decimal CalculateInterestRate(decimal loanAmount, int loanPeriod, decimal monthlyPayment)
        {
            decimal interestRate = 0.1m; // Initial value for the interest rate
            decimal epsilon = 0.00001m; // Minimum difference value between the actual value and the calculated value
            decimal f;
            decimal f_prime;
            decimal payment;

            // Using the Newton-Raphson method to find the interest rate
            do
            {
                payment = loanAmount * (interestRate / 12) * (decimal)Math.Pow((double)(1 + interestRate / 12), loanPeriod) /
                    (decimal)(Math.Pow((double)(1 + interestRate / 12), loanPeriod) - 1);
                f = payment - monthlyPayment;
                f_prime = loanAmount * (decimal)Math.Pow((double)(1 + interestRate / 12), loanPeriod) *
                    (1 / (decimal)(Math.Pow((double)(1 + interestRate / 12), loanPeriod) - 1) - (loanPeriod * (interestRate / 12)) /
                    (decimal)Math.Pow((double)(1 + interestRate / 12), loanPeriod));
                interestRate -= f / f_prime;
            } while (Math.Abs(f) > epsilon);

            return interestRate * 12 * 100; // Convert the monthly interest rate to an annual rate percentage.
        }

        public static int CalculateLoanPeriod(decimal loanAmount, decimal monthlyPayment, decimal interestRate)
        {
            double amount = (double)loanAmount;
            double payment = (double)monthlyPayment;
            double rate = (double)interestRate / 100 / 12; // Convert annual rate percentage to monthly rate

            double n = Math.Ceiling(Math.Log(payment / (payment - amount * rate)) / Math.Log(1 + rate));
            return (int)n;
        }

        public static decimal CalculateLoanInstallment(decimal loanAmount, decimal interestRate, int loanPeriod)
        {
            decimal amount = loanAmount;
            int period = loanPeriod;
            decimal rate = interestRate / 100 / 12; // Convert annual rate percentage to monthly rate

            decimal installment = amount * rate * (decimal)Math.Pow((double)(1 + rate), period) / ((decimal)Math.Pow((double)(1 + rate), period) - 1);
            return installment;
        }
    }
}
