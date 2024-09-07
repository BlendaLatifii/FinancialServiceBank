using Domain.Models;

namespace Domain.Interfaces
{
    public interface ILoanService
    {
        Task<LoanModel> GetLoanByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<int> CountAllLoansAsync(CancellationToken cancellationToken);
        Task<List<LoanModel>> GetAllLoansAsync(CancellationToken cancellationToken);
        Task<LoanModel> CreateOrUpdateLoanAsync(LoanModel model, CancellationToken cancellationToken);
        Task DeleteLoan(Guid id, CancellationToken cancellationToken);
    }
}