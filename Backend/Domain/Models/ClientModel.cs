using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{

    public class ClientModel
    {
        public Guid? Id { get; set; } = default!;
        public string PersonalNumberId { get; set; } = default!;
        public string FirstName { get; set; } = default!;
        public string MiddleName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string EmailAddress { get; set; } = default!;
        public StateOfClient State { get; set; } = default!;
        public CityOfClient City { get; set; } = default!;
        public string ZipCode { get; set; } = default!;
 //       public DateTime DateOfBirth { get; set; } = default!;
    }
}