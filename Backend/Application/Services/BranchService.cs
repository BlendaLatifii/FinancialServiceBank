using AutoMapper;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class BranchService:IBranchService
    {
        public readonly AppDbContext _context;
        private readonly IMapper mapper;

        public BranchService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }
        public async Task<List<BranchModel>> GetAllBranchesAsync(CancellationToken cancellationToken)
        {
            var branches = await _context.Branches.ToListAsync(cancellationToken);

            var branchmodel = mapper.Map<List<BranchModel>>(branches);
            return branchmodel;
        }
        public async Task GetBranchById(int branchId, CancellationToken cancellationToken)
        {
            var branch = await _context.Branches
                .Where(x => x.BranchId == branchId)
                .FirstOrDefaultAsync(cancellationToken);
            if (branch != null)
            {
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
        public async Task DeleteBranch(int id, CancellationToken cancellationToken)
        {
            var branch = await _context.Branches
                 .Where(x => x.BranchId == id)
                 .FirstOrDefaultAsync(cancellationToken);

            if (branch != null)
            {
                _context.Branches.Remove(branch);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
