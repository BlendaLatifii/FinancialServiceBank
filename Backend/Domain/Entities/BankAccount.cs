
namespace Domain.Entities
{
    public class BankAccount
    { 
       public string AccountTypeID { get; set; } = default! ;
        public string AccountDescription {get; set;} = default! ;

        public List<ClientBankAccount> ClientBankAccounts { get; set; }
    }
}