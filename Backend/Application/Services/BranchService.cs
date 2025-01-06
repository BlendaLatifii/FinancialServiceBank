using AutoMapper;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Infrastructure.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Application.Services
{
    public class BranchService : IBranchService
    {
        public readonly AppDbContext _context;
        private readonly IMapper mapper;
        private readonly IAuthorizationManager _authorizationManager;

        public BranchService(AppDbContext context,
            IAuthorizationManager authorizationManager,
            IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
            _authorizationManager = authorizationManager;
        }
        public async Task<List<BranchModel>> GetAllBranchesAsync(CancellationToken cancellationToken)
        {
            var branches = await _context.Branches.Include(x=> x.User).ToListAsync(cancellationToken);

            var branchmodel = mapper.Map<List<BranchModel>>(branches);
            return branchmodel;
        }
        public async Task<BranchModel> GetBranchById(Guid id, CancellationToken cancellationToken)
        {
            var branch = await _context.Branches
                .Where(x => x.BranchId == id)
                .Include(x=> x.User)
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
        public async Task<List<ListItemModel>> GetBranchesSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await _context.Branches
                .Select(x => new ListItemModel()
                {
                    Id = x.BranchId,
                    Name = x.BranchName
                }).ToListAsync(cancellationToken);

            return model;

        }
        public async Task<BranchModel> CreateOrUpdateBranchAsync(BranchModel model, CancellationToken cancellationToken)
        {
            Guid? userId = _authorizationManager.GetUserId();

            if (userId is null)
            {
                throw new UnauthorizedAccessException("User is not authenticated.");
            }
            Branch branch = new Branch();

            if (model.BranchId == null || model.BranchId == Guid.Empty)
            {
                await _context.Branches.AddAsync(branch, cancellationToken);
            }
            else
            {
                branch = await _context.Branches.FindAsync(model.BranchId);
             /*   if (existingBranch == null)
                {
                    throw new AppBadDataException();
                }

                existingBranch.BranchName = model.BranchName;
                existingBranch.Address = model.Address;
                existingBranch.PhoneNumber = model.PhoneNumber;
                existingBranch.Opened = model.Opened;

                await _context.SaveChangesAsync(cancellationToken);

                return new BranchModel
                {
                    BranchId = existingBranch.BranchId,
                    BranchName = existingBranch.BranchName,
                    Address = existingBranch.Address,
                    PhoneNumber = existingBranch.PhoneNumber,
                    Opened = existingBranch.Opened,
                    UserId = existingBranch.UserId
                }; */
            }
           
            branch.BranchName = model.BranchName;
            branch.Address = model.Address;
            branch.PhoneNumber = model.PhoneNumber; 
            branch.Opened = model.Opened;
            branch.UserId = (Guid)userId;

            await _context.SaveChangesAsync(cancellationToken);

            return await GetBranchById(branch.BranchId, cancellationToken);
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