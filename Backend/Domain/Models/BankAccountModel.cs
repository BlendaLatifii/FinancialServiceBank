
using Domain.Entities;

namespace Domain.Models
{
    public class BankAccountModel
    {
		public int ID { get; set; }
		public AccountType AccountType { get; set; } = default!; //enum me tregu llojin e acc
		public string AccountDescription { get; set; } = default!;
		public decimal CurrentBalance { get; set; } = default!;
		public string Email { get; set; } = default!;
		public string AccountNumberGenerated { get; set; } = default!;
		public DateTime DateCreated { get; set; } = default!;
		public DateTime DateLastUpdated { get; set; } = default!;
	}
}