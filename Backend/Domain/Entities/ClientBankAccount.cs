﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ClientBankAccount
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; } = default!;
        public string AccountNumberGeneratedID { get; set; } = GenerateAccountNumber();
        public Guid BankAccountId { get; set; }
        public Guid BranchId { get; set; }
        public decimal CurrentBalance { get; set; } = default!;
        public DateTime DateCreated { get; set; } = default!;
        public DateTime DateLastUpdated { get; set; } = default!;
        public Guid CreatedByUserId { get; set; }
        public Guid LastUpdatedByUserId { get; set; }
        public User User { get; set; } = default!;
        public BankAccount BankAccount { get; set; } = default!;
        public Branch Branch { get; set; } = default!;
        public CreditCards CreditCards { get; set; } = default!;
        public Loan Loans { get; set; } = default!;

        private static string GenerateAccountNumber()
        {
            Random rnd = new Random();
            return rnd.Next(100000000, 999999999).ToString(); // Numri do të jetë një numër 9-shifror unik
        }
    }

}
