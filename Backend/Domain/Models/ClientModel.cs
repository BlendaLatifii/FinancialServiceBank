using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{

    public class ClientModel
    {
        public Guid? Id { get; set; } = default!;
        [Required(ErrorMessage = "The Name field is required.")]
        public string PersonalNumberId { get; set; } = default!;
        [Required(ErrorMessage = "The PersonalNumber field is required.")]
        public string FirstName { get; set; } = default!;
        [Required(ErrorMessage = "The FirstName field is required.")]
        public string MiddleName { get; set; } = default!;
        [Required(ErrorMessage = "The MiddleName field is required.")]
        public string LastName { get; set; } = default!;
        [Required(ErrorMessage = "The LastName field is required.")]
        public string PhoneNumber { get; set; } = default!;
        [Required(ErrorMessage = "The Email field is required.")]
        public string EmailAddress { get; set; } = default!;
        [Required(ErrorMessage = "The State field is required.")]
        public string State { get; set; } = default!;
        [Required(ErrorMessage = "The City field is required.")]
        public string City { get; set; } = default!;
        [Required(ErrorMessage = "The ZipCode field is required.")]
        public string ZipCode { get; set; } = default!;
 //       public DateTime DateOfBirth { get; set; } = default!;
    }
}