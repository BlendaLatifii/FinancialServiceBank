
using Domain.Entities;

namespace Domain.Models
{
    public class BankAccountModel
    {
		public Guid Id { get; set; }
		public string AccountType { get; set; } = default!; 
		public string AccountDescription { get; set; } = default!;
	}
}