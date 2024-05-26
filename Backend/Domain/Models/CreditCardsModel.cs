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
		public Guid? Id { get; set; }
		public int CVV { get; set; }
		public int AccountNumber { get; set; }
		public Guid TypesOfCreditCardsID { get; set; }
	}
}
