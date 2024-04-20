
namespace Domain.Entities
{
    public class BankAccount
    {
        public int ID {get; set;}
        public AccountType AccountType { get; set; } = default! ; //enum me tregu llojin e acc
        public string AccountDescription {get; set;} = default! ;
        public decimal CurrentBalance { get; set; } = default! ;
        public string AccountNumberGenerated { get; set; } = default! ;
        public string Email { get; set; } = default!;
        public DateTime DateCreated { get; set; } = default! ;
        public DateTime DateLastUpdated { get; set; } = default! ;
        public Client Client { get; set; } = default! ;

         Random rand = new Random();
        public BankAccount() // me gjeneru nr e kartes
        {
            AccountNumberGenerated = Convert.ToString((long) rand.NextDouble() * 9_000_000_000L + 1_000_000_000L);
        }

    }
    public enum AccountType
    {
        LlogariStudentore,
        Savings,
        Corporate,
        Business
    }
}