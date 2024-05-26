
using Domain.Entities;

namespace Domain.Models
{
	public class LoansTypeModel
	{
		public Guid Id { get; set; }
		public string LoanType { get; set; } = default!;
	}
}
