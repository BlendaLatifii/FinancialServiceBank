using Domain.Entities;

namespace Domain.Models
{
	public class TypesOfCreditCardsModel
	{
		public Guid? Id { get; set; }
		public Guid? UserId { get; set; } = default!;
		public string Name { get; set; }
		public string? UserName { get; set; } = default!;
		public string Description { get; set; }
	}
}
