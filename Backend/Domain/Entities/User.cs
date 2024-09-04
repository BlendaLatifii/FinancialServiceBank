using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string LastName { get; set; } = default!;
        public string MiddleName { get; set; } = default!;
        public string PersonalNumberId { get; set; } = default!;
        public string RefreshToken { get; set; } = default!;
        public DateTime TokenCreated { get; set; } 
        public DateTime TokenExpires { get; set; }
        public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
        public List<UserRole> UserRoles { get; set; } = default!;
        public List<ContactUs> ContactUs { get; set; } = new List<ContactUs>();
        public List<BankAccount> BankAccount { get; set; } = new List<BankAccount>();
        public List<Branch> Branches { get; set; } = new List<Branch>();
        public List<ClientBankAccount> ClientBankAccounts { get; set; } = new List<ClientBankAccount>();
        public List<CreditCards> CreditCards { get; set; } = new List<CreditCards>();
        public List<Loan> Loans { get; set; } = new List<Loan>();
        public List<Transaction> Transactions{ get; set; } = new List<Transaction>();
        public List<TypesOfCreditCards> TypesOfCreditCards { get; set; } = new List<TypesOfCreditCards>();
    }
}
