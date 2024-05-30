

namespace Domain.Entities
{
	public class CreditCards
	{
		public Guid Id { get; set; }
		public string CVV { get; set; } = generateCVV();
		public Guid ClientBankAccountId { get; set; }
		public Guid TypesOfCreditCardsID { get; set; }
		public DateTime ValidThru { get; set; } = generateValidThru();
		public TypesOfCreditCards TypesOfCreditCards { get; set; } = default!;
		public ClientBankAccount ClientBankAccount { get; set; } = default!;

		private static string generateCVV()
		{
			Random rnd = new Random();
			return rnd.Next(100, 999).ToString();
		}

		private static DateTime generateValidThru()
		{
			DateTime today = DateTime.Today;
			return new DateTime(today.Year + 5, today.Month, 1).AddMonths(1).AddDays(-1);
		}

	}
}