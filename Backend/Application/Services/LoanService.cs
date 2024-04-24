using AutoMapper;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace Application.Services
{
    public class LoanService : ILoanService
    {
        public readonly AppDbContext _context;
        private readonly IMapper mapper;

        public LoanService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }
        public async Task<List<LoanModel>> GetAllLoansAsync(CancellationToken cancellationToken)
        {
            var loans = await _context.Loans.ToListAsync(cancellationToken);

            var loanmodel = mapper.Map<List<LoanModel>>(loans);
            return loanmodel;
        }
        public async Task GetLoanById(int Id, CancellationToken cancellationToken)
        {
            var loan = await _context.Loans
                .Where(x => x.Id == Id)
                .FirstOrDefaultAsync(cancellationToken);
            if (loan != null)
            {
                await _context.SaveChangesAsync(cancellationToken);
            }
        }

        public async Task DeleteLoan(int id, CancellationToken cancellationToken)
        {
            var loan = await _context.Loans
                 .Where(x => x.Id== id)
                 .FirstOrDefaultAsync(cancellationToken);

            if (loan != null)
            {
                _context.Loans.Remove(loan);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
