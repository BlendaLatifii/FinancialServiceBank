using AutoMapper;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class BranchService : IBranchService
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
        public async Task<BranchModel> GetBranchById(Guid id, CancellationToken cancellationToken)
        {
            var branch = await _context.Branches
                .Where(x => x.BranchId == id)
                .FirstOrDefaultAsync(cancellationToken);
            if (branch == null)
            {
                throw new AppBadDataException();
            }
            else
            { 
                await _context.SaveChangesAsync(cancellationToken);
                var model = mapper.Map<BranchModel>(branch);
                return model;
            }
           
        }
        public async Task<BranchModel> CreateOrUpdateBranchAsync(BranchModel model, CancellationToken cancellationToken)
        {
            if (model.BranchId == null || model.BranchId == Guid.Empty)
            {
                // Krijoni një degë të re
                var newBranch = new Branch()
                {
                    BranchName = model.BranchName,
                    Address = model.Address,
                    PhoneNumber = model.PhoneNumber,
                    Opened = model.Opened
                };

                await _context.Branches.AddAsync(newBranch, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                // Kthe një përgjigje 201 Created dhe modelin e degës së krijuar
                return new BranchModel
                {
                    BranchId = newBranch.BranchId,
                    BranchName = newBranch.BranchName,
                    Address = newBranch.Address,
                    PhoneNumber = newBranch.PhoneNumber,
                    Opened = newBranch.Opened
                };
            }
            else
            {
                // Përditëso degën ekzistuese
                var existingBranch = await _context.Branches.FindAsync(model.BranchId);
                if (existingBranch == null)
                {
                    throw new AppBadDataException();
                }

                existingBranch.BranchName = model.BranchName;
                existingBranch.Address = model.Address;
                existingBranch.PhoneNumber = model.PhoneNumber;
                existingBranch.Opened = model.Opened;

                await _context.SaveChangesAsync(cancellationToken);

                // Kthe një përgjigje OK dhe modelin e degës së përditësuar
                return new BranchModel
                {
                    BranchId = existingBranch.BranchId,
                    BranchName = existingBranch.BranchName,
                    Address = existingBranch.Address,
                    PhoneNumber = existingBranch.PhoneNumber,
                    Opened = existingBranch.Opened
                };
            }
        }

        public async Task DeleteBranch(Guid id, CancellationToken cancellationToken)
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