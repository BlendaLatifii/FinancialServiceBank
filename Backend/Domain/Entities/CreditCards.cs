

namespace Domain.Entities
{
	public class CreditCards
	{
		public Guid? Id { get; set; }
		public int CVV { get; set; }
		public int AccountNumber { get; set; }
		public Guid TypesOfCreditCardsID { get; set; }
		public TypesOfCreditCards TypesOfCreditCards { get; set; }

		private static string CVV()
		{
			Random rnd = new Random();
			return rnd.Next(100, 999).ToString();
		}
	}
}
