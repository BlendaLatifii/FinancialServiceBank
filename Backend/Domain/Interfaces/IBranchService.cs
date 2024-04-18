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
        Task GetBranchById(int branchId, CancellationToken cancellationToken);
        Task<List<BranchModel>> GetAllBranchesAsync(CancellationToken cancellationToken);
        Task DeleteBranch(int branchId, CancellationToken cancellationToken);
    }
}