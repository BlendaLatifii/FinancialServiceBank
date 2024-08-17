using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IBranchService
    {
        Task<BranchModel> GetBranchById(Guid branchId, CancellationToken cancellationToken);
        Task<List<BranchModel>> GetAllBranchesAsync(CancellationToken cancellationToken);
        Task<BranchModel> CreateOrUpdateBranchAsync(BranchModel model, CancellationToken cancellationToken);
        Task DeleteBranch(Guid branchId, CancellationToken cancellationToken);
        Task<List<ListItemModel>> GetBranchesSelectListAsync(CancellationToken cancellationToken);
    }
}