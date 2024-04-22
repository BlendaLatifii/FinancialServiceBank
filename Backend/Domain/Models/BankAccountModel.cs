
using Domain.Entities;

namespace Domain.Models
{
    public class BankAccountModel
    {
		public string AccountTypeID { get; set; } = default!; 
		public string AccountDescription { get; set; } = default!;
	}
}