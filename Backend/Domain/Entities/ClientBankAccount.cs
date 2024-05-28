using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ClientBankAccount
    {
        public Guid Id { get; set; }
        public string AccountNumberGeneratedID { get; set; } = GenerateAccountNumber();
        public Guid ClientId { get; set; } 
        public Guid BankAccountId { get; set; }
        public decimal CurrentBalance { get; set; } = default!;
        public DateTime DateCreated { get; set; } = default!;
        public DateTime DateLastUpdated { get; set; } = default!;
        public Client Client { get; set; } = default!;
        public BankAccount BankAccount { get; set; } = default!;
        public List<Transaction> SendTransations { get; set; } = new List<Transaction>();
        public List<Transaction> RecivedTransations { get; set; } = new List<Transaction>();

        private static string GenerateAccountNumber()
        {
            Random rnd = new Random();
            return rnd.Next(100000000, 999999999).ToString(); // Numri do të jetë një numër 9-shifror unik
        }
    }

}
