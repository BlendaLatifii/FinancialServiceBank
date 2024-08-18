
using Domain.Enums;

namespace Domain.Entities
{
    public class Client
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; } = default!;
        public string PersonalNumberId { get; set; } = default!;
        public string FirstName { get; set; } = default! ;
        public string MiddleName { get; set; } = default!;
        public string LastName { get; set; } = default! ;
        public string PhoneNumber { get; set; } = default!;
        public string EmailAddress { get; set; } = default!;
        public StateOfClient State { get; set; }
        public CityOfClient City { get; set; }
        public string ZipCode { get; set; } = default!;
        public User User { get; set; } = default!;
        public List<ClientBankAccount> ClientBankAccounts { get; set; }
    }


}