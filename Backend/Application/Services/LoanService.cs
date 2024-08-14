using AutoMapper;
using Domain.Entities;
using Domain.Exceptions;
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
        public async Task<LoanModel> GetLoanByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var loan = await _context.Loans
                .Where(x => x.Id == id)
                .Include(x => x.ClientBankAccount)
                .FirstOrDefaultAsync(cancellationToken);
            if (loan == null)
            {
                throw new AppBadDataException();
            }
            else
            {
                var model = mapper.Map<LoanModel>(loan);
                return model;
            }
        }

        public async Task<LoanModel> CreateOrUpdateLoanAsync(LoanModel model, CancellationToken cancellationToken)
        {
            var clientAccount = await _context.ClientBankAccounts.FirstOrDefaultAsync(x => x.AccountNumberGeneratedID == model.ClientAccountNumber, cancellationToken);
            if (clientAccount == null)
            {
                throw new Exception("Client not found with the provided Account Number.");
            }
            if (model.Id == null || model.Id == Guid.Empty)
            {
                var newLoan = new Loan()
                {
                    ClientBankAccountId = clientAccount.Id,
                    LoansTypesId = model.LoansTypesId,
                    LoanAmount = model.LoanAmount,
                    Income = model.Income,
                    EmploymentStatus = model.EmploymentStatus
                };
                await _context.Loans.AddAsync(newLoan, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);
                
                return new LoanModel
                {
                    Id = newLoan.Id,
                    ClientBankAccountId = newLoan.ClientBankAccountId,
                    LoansTypesId = newLoan.LoansTypesId,
                    LoanAmount=newLoan.LoanAmount,
                    InterestRate = model.InterestRate,
                    MonthlyPayment=newLoan.MonthlyPayment,
                    Income=newLoan.Income,
                    LoanPeriod = newLoan.LoanPeriod,
                    EmploymentStatus =newLoan.EmploymentStatus
                };
            }
            else
            {
                var existingLoan = await _context.Loans.FindAsync(model.Id);
                if (existingLoan == null)
                {
                    throw new AppBadDataException();
                }
                existingLoan.ClientBankAccountId = clientAccount.Id;
                existingLoan.LoansTypesId = model.LoansTypesId;
                existingLoan.LoanAmount = model.LoanAmount;
                existingLoan.Income = model.Income;
                existingLoan.EmploymentStatus = model.EmploymentStatus;
             

                await _context.SaveChangesAsync(cancellationToken);

                return new LoanModel
                {
                    Id = existingLoan.Id,
                    LoanPeriod = existingLoan.LoanPeriod,
                    ClientBankAccountId = existingLoan.ClientBankAccountId,
                    LoansTypesId = existingLoan.LoansTypesId,
                    InterestRate = existingLoan.InterestRate,
                    LoanAmount = existingLoan.LoanAmount,
                    MonthlyPayment = existingLoan.MonthlyPayment,
                    Income = existingLoan.Income,
                    EmploymentStatus = existingLoan.EmploymentStatus
                };
            }
        }

        public async Task DeleteLoan(Guid id, CancellationToken cancellationToken)
        {
            var loan = await _context.Loans
                 .Where(x => x.Id == id)
                 .FirstOrDefaultAsync(cancellationToken);

            if (loan == null)
            {
                throw new ApplicationException("This Loan does not exist.");
            }
            _context.Loans.Remove(loan);
            await _context.SaveChangesAsync();
        }
    }
}
