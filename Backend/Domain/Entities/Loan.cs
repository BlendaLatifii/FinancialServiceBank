using System;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Enums;

namespace Domain.Entities
{
    public class Loan
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; } = default!;
        public Guid ClientBankAccountId { get; set; } = default!;
        public LoanType LoansTypesId { get; set; } = default!;
        public string LoanAmount { get; set; } = default!;
        public string Income { get; set; } = default!;
        public EmploymentStatus EmploymentStatus { get; set; }
        public string LoanPeriod { get; set; } = default!;
        public double InterestRate { get; set; } = default!;
        public string MonthlyPayment { get; set; } = default!;
        public User User { get; set; } = default!;
        public ClientBankAccount ClientBankAccount { get; set; } = default!;
        public Loan()
        {
            LoanPeriod = CalculateLoanPeriod(LoanAmount , Income, EmploymentStatus);
            InterestRate = CalculateAnnualInterestRate(EmploymentStatus, Income, LoanPeriod);
            MonthlyPayment = CalculateMonthlyPayment(LoanAmount, InterestRate, LoanPeriod);
        }

        public static string CalculateLoanPeriod(string loanAmountStr, string incomestr, EmploymentStatus employmentStatus)
        {
            if (decimal.TryParse(loanAmountStr, out decimal loanAmount))
            {
                if (loanAmount < 1000)
                {
                    if (employmentStatus == EmploymentStatus.i_pa_pune)
                    {
                        return "6"; 
                    }
                    return "12";
                }
                else if (loanAmount >= 1000 && loanAmount <= 10000)
                {
                    if (decimal.TryParse(incomestr, out decimal income))
                    {
                        if (income < 1000 || employmentStatus == EmploymentStatus.i_pa_pune)
                        {
                            return "36"; 
                        }
                    }
                    return "24";
                }
                else if (loanAmount > 10000 && loanAmount <= 20000)
                {
                    if (decimal.TryParse(incomestr, out decimal income))
                    {
                        if (income < 1000)
                        {
                            return "48";
                        }
                    }
                    return "36"; 
                }
                else if (loanAmount > 20000 && loanAmount < 50000)
                {
                    if (decimal.TryParse(incomestr, out decimal income))
                    {
                        if (income < 1000)
                        {
                            return "60";
                        }
                    }
                    return "48"; 
                }
                else
                {
                    return "60"; 
                }
            }

            return "Invalid input";
        }
        public static double CalculateAnnualInterestRate(EmploymentStatus employmentStatus, string incomeStr, string loanPeriodStr)
        {
            double annualInterestRate = 4.0;

            if (decimal.TryParse(incomeStr, out decimal income))
            {
                if (income > 50000)
                {
                    annualInterestRate -= 0.5;
                }
            }

            if (int.TryParse(loanPeriodStr, out int loanPeriodInMonths))
            {
                if (loanPeriodInMonths > 60)
                {
                    annualInterestRate += 0.5;
                }
            }

            switch (employmentStatus)
            {
                case EmploymentStatus.i_vete_punesuar:
                    annualInterestRate += 0.5;
                    break;
                case EmploymentStatus.i_pa_pune:
                    annualInterestRate += 1.0;
                    break;
            }

            return annualInterestRate;
        }
        public static string CalculateMonthlyPayment(string loanAmountStr, double annualInterestRate, string loanPeriodStr)
        {
            if (decimal.TryParse(loanAmountStr, out decimal loanAmount) && int.TryParse(loanPeriodStr, out int loanPeriodInMonths))
            {
                double monthlyInterestRate = annualInterestRate / 100 / 12; 
                double numerator = (double)loanAmount * monthlyInterestRate * Math.Pow(1 + monthlyInterestRate, loanPeriodInMonths);
                double denominator = Math.Pow(1 + monthlyInterestRate, loanPeriodInMonths) - 1;
                double monthlyPayment = numerator / denominator;

                return monthlyPayment.ToString("F2"); 
            }

            return "Invalid input"; 
        }


    }
}