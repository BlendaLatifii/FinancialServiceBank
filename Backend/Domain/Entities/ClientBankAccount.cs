using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ClientBankAccount
    {
        public string AccountNumberGeneratedID { get; set; } = GenerateAccountNumber();
        public int PersonalNumberID { get; set; } 
        public Guid Id { get; set; }
        public decimal CurrentBalance { get; set; } = default!;

        public DateTime DateCreated { get; set; } = default!;
        public DateTime DateLastUpdated { get; set; } = default!;
        public Client Client { get; set; }
        public BankAccount BankAccount { get; set; }

        private static string GenerateAccountNumber()
        {
            Random rnd = new Random();
            return rnd.Next(100000000, 999999999).ToString(); // Numri do të jetë një numër 9-shifror unik
        }
    }

}
