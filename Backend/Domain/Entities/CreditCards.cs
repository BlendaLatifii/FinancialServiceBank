

namespace Domain.Entities
{
    public class CreditCards
    {
        public Guid Id { get; set; }
        public Guid ClientBankAccountId { get; set; }
        public Guid TypesOfCreditCardsID { get; set; }
        public string Cvv { get; set; } = GenerateCvv();
        public decimal Balance { get; set; }
        public decimal Limite { get; set; }
        public DateTime ValidThru { get; set; } = generateValidThru();
        public TypesOfCreditCards TypesOfCreditCards { get; set; } = default!;
        public ClientBankAccount ClientBankAccount { get; set; } = default!;
        private static DateTime generateValidThru()
        {
            DateTime today = DateTime.Today;
            return new DateTime(today.Year + 5, today.Month, 1).AddMonths(1).AddDays(-1);
        }
        private static string GenerateCvv()
        {
            Random rnd = new Random();
            return rnd.Next(100, 999).ToString(); 
        }

    }
}