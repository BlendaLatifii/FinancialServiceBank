
namespace Domain.Entities
{
    public class TypesOfCreditCards
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; } = default!;
        public string Name { get; set; }
        public string Description { get; set; }
        public User User { get; set; } = default!;
        public List<CreditCards> CreditCards { get; set; } = new List<CreditCards>();
    }
}
