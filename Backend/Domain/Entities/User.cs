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
        public string LastName { get; set; }
        public List<UserRole> UserRoles { get; set; }
        public List<ContactUs> ContactUs { get; set; } = new List<ContactUs>();
        public List<BankAccount> BankAccount { get; set; } = new List<BankAccount>();
        public List<Branch> Branches { get; set; } = new List<Branch>();
        public List<Client> Clients { get; set; } = new List<Client>();
        public List<ClientBankAccount> ClientBankAccounts { get; set; } = new List<ClientBankAccount>();
        public List<CreditCards> CreditCards { get; set; } = new List<CreditCards>();
        public List<Loan> Loans { get; set; } = new List<Loan>();
        public List<Transaction> Transactions{ get; set; } = new List<Transaction>();
        public List<TypesOfCreditCards> TypesOfCreditCards { get; set; } = new List<TypesOfCreditCards>();
    }
}
