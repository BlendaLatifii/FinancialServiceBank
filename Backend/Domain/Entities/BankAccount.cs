
namespace Domain.Entities
{
    public class BankAccount
    {  
       public Guid Id { get; set; }
       public Guid UserId { get; set; }
       public string AccountType { get; set; } = default!;
       public string AccountDescription {get; set;} = default!;
       public string TarifaMirembajtese { get; set; } = default!;
        public User User { get; set; } = default!;
        public List<ClientBankAccount> ClientBankAccounts { get; set; }
    }
}