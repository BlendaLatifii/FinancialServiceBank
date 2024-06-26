using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class CreditCardsModel
    {
        public int? Id { get; set; }
        public Guid? ClientBankAccountId { get; set; }
        public string ClientAccountNumber { get; set; }
        public decimal? Balance { get; set; }
        public decimal Limite { get; set; }
        public int TypesOfCreditCardsID { get; set; }
        public DateTime? ValidThru { get; set; }
    }
}