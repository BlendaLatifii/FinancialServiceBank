
namespace Domain.Entities
{
    public class LoansType
    {
        public Guid Id { get; set; }
        public string LoanType { get; set; } = default!;
        public List<Loan> Loans { get; set; } = new List<Loan>();
    }
}
