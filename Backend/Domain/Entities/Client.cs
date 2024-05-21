
namespace Domain.Entities
{
    public class Client
    {
        public Guid Id { get; set; }
        public string PersonalNumberId { get; set; } = default!;
        public string FirstName { get; set; } = default! ;
        public string MiddleName { get; set; } = default!;
        public string LastName { get; set; } = default! ;
        public string PhoneNumber { get; set; } = default!;
        public string EmailAddress { get; set; } = default!;
        public string State { get; set; } = default!;
        public string City { get; set; } = default!;
        public string ZipCode { get; set; } = default! ;
       public List<ClientBankAccount> ClientBankAccounts { get; set; }
    }


}