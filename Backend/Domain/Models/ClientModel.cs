namespace Domain.Models
{

    public class ClientModel
    {
        public string ClientAddress { get; set; } = default!;
        public string ClientFirstName { get; set; } = default!;
        public string ClientMiddleName { get; set; } = default!;
        public string ClientLastName { get; set; } = default!;
		public int PersonalNumber { get; set; } = default!;
		public string City { get; set; } = default!;
        public string State { get; set; } = default!;
        public string ZipCode { get; set; } = default!;
        public string EmailAddress { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public DateTime ClientDateOfBirth { get; set; } = default!;
    }
}