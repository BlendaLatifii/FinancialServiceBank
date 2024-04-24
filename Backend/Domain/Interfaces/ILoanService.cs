using Domain.Models;

namespace Domain.Interfaces
{
    public interface ILoanService
    {
        Task GetLoanById(int loanId, CancellationToken cancellationToken);
        Task<List<LoanModel>> GetAllLoansAsync(CancellationToken cancellationToken);
        Task DeleteLoan(int loanId, CancellationToken cancellationToken);
    }
}