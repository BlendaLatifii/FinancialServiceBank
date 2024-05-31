
using AutoMapper;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class LoansTypeService : ILoansTypeService
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public LoansTypeService(AppDbContext _context, IMapper _mapper)
        {
            this._context = _context;
            this._mapper = _mapper;
        }

        public async Task<List<LoansTypeModel>> GetAllLoansTypesAsync(CancellationToken cancellationToken)
        {
            var loans = await _context.LoansType.ToListAsync(cancellationToken);

            var loansmodel = _mapper.Map<List<LoansTypeModel>>(loans);
            return loansmodel;
        }
        public async Task<LoansTypeModel> GetLoansTypeById(Guid id, CancellationToken cancellationToken)
        {
            var loans = await _context.LoansType
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
            if (loans == null)
            {
                throw new AppBadDataException();
            }
            else
            {
                await _context.SaveChangesAsync(cancellationToken);
                var model = _mapper.Map<LoansTypeModel>(loans);
                return model;
            }

        }
        public async Task<LoansTypeModel> CreateOrUpdateLoansType(LoansTypeModel model, CancellationToken cancellationToken)
        {
            if (model.Id == null || model.Id == Guid.Empty)
            {
                var newloanType = new LoansType()
                {
                    LoanType = model.LoanType
                };

                await _context.LoansType.AddAsync(newloanType, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return new LoansTypeModel
                {
                    Id = newloanType.Id,
                    LoanType = newloanType.LoanType
                };
            }
            else
            {
                var existingLoanType = await _context.LoansType.FindAsync(model.Id);
                if (existingLoanType == null)
                {
                    throw new AppBadDataException();
                }

                existingLoanType.LoanType = model.LoanType;

                await _context.SaveChangesAsync(cancellationToken);

                return new LoansTypeModel
                {
                    Id = existingLoanType.Id,
                    LoanType = existingLoanType.LoanType
                };
            }
        }

        public async Task<List<ListItemModel>> GetTypesOfLoansSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await _context.LoansType
                .Select(x => new ListItemModel()
                {
                    Id = x.Id,
                    Name = x.LoanType
                }).ToListAsync(cancellationToken);

            return model;

        }
        public async Task DeleteLoansType(Guid id, CancellationToken cancellationToken)
        {
            var loans = await _context.LoansType
                 .Where(x => x.Id == id)
                 .FirstOrDefaultAsync(cancellationToken);

            if (loans == null)
            {
                throw new ApplicationException("Loan does not exist.");
            }
            _context.LoansType.Remove(loans);
            await _context.SaveChangesAsync();
        }
    }
}

