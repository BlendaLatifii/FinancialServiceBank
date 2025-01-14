using AutoMapper;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;


namespace Application.Services
{
    public class LoanService : ILoanService
    {
        public readonly AppDbContext _context;
        private readonly IMapper mapper;
        private readonly IAuthorizationManager _authorizationManager;

        public LoanService(AppDbContext context, IMapper mapper, IAuthorizationManager authorizationManager)
        {
            _context = context;
            this.mapper = mapper;
            _authorizationManager = authorizationManager;
        }
        public async Task<List<LoanModel>> GetAllLoansAsync(CancellationToken cancellationToken)
        {
            var loans = await _context.Loans.Include(x => x.User).Include(x=>x.ClientBankAccount).ToListAsync(cancellationToken);

            var loanmodel = mapper.Map<List<LoanModel>>(loans);
            return loanmodel;
        }
        public async Task<int> CountAllLoansAsync(CancellationToken cancellationToken)
        {
            return await _context.Loans.CountAsync(cancellationToken);
        }
        public async Task<LoanModel> GetLoanByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var loan = await _context.Loans
                .Where(x => x.Id == id)
                .Include(x => x.User)
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
            Guid? userId = _authorizationManager.GetUserId();
            if (userId is null)
            {
                throw new UnauthorizedAccessException("User is not authenticated.");
            }

            var clientAccount = await _context.ClientBankAccounts
                .FirstOrDefaultAsync(x => x.AccountNumberGeneratedID == model.ClientAccountNumber, cancellationToken);
            if (clientAccount == null)
            {
                throw new Exception("Client not found with the provided Account Number.");
            }

            Loan loan;

            if (model.Id == null || model.Id == Guid.Empty)
            {
                // Create a new loan using the LoanBuilder
                loan = new LoanBuilder()
                    .WithClientBankAccountId(clientAccount.Id)
                    .WithLoansTypesId(model.LoansTypesId)
                    .WithLoanAmount(model.LoanAmount)
                    .WithIncome(model.Income)
                    .WithEmploymentStatus(model.EmploymentStatus)
                    .WithUserId(userId.Value)
                    .CalculateDerivedFields()
                    .Build();

                await _context.Loans.AddAsync(loan, cancellationToken);
            }
            else
            {
                // Update an existing loan
                loan = await _context.Loans.FindAsync(model.Id);
                if (loan == null)
                {
                    throw new Exception("Loan not found with the provided ID.");
                }

                loan = new LoanBuilder()
                    .WithClientBankAccountId(clientAccount.Id)
                    .WithLoansTypesId(model.LoansTypesId)
                    .WithLoanAmount(model.LoanAmount)
                    .WithIncome(model.Income)
                    .WithEmploymentStatus(model.EmploymentStatus)
                    .WithUserId(userId.Value)
                    .CalculateDerivedFields()
                    .Build();
            }

            await _context.SaveChangesAsync(cancellationToken);

            return new LoanModel
            {
                Id = loan.Id,
                LoanPeriod = loan.LoanPeriod,
                ClientBankAccountId = loan.ClientBankAccountId,
                LoansTypesId = loan.LoansTypesId,
                InterestRate = loan.InterestRate,
                LoanAmount = loan.LoanAmount,
                MonthlyPayment = loan.MonthlyPayment,
                Income = loan.Income,
                EmploymentStatus = loan.EmploymentStatus
            };
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
