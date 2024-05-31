using AutoMapper;
using Domain.Entities;
using Domain.Models;
namespace Application.Mappings
{
    public class LoanMappings : Profile
    {
        public LoanMappings()
        {
            CreateMap<Loan, LoanModel>()
                  .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                   .ForMember(x => x.LoanAmount, y => y.MapFrom(x => x.LoanAmount))
                    .ForMember(x => x.ClientBankAccountId, y => y.MapFrom(x => x.ClientBankAccountId))
                    .ForMember(x => x.ClientAccountNumber, y => y.MapFrom(x => x.ClientBankAccount.AccountNumberGeneratedID))
                     .ForMember(x => x.LoansTypesId, y => y.MapFrom(x => x.LoansTypesId))
                     .ForMember(x => x.InterestRate, y => y.MapFrom(x => x.InterestRate))
                     .ForMember(x => x.MonthlyPayment, y => y.MapFrom(x => x.MonthlyPayment))
                     .ForMember(x => x.LoanPeriod, y => y.MapFrom(x => x.LoanPeriod))
                     .ForMember(x => x.Income, y => y.MapFrom(x => x.Income))
                     .ForMember(x => x.LoanInstallment, y => y.MapFrom(x => x.LoanInstallment))
                     .ForMember(x => x.EmploymentStatus, y => y.MapFrom(x => x.EmploymentStatus));
            CreateMap<LoanModel, Loan>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                 .ForMember(x => x.LoanAmount, y => y.MapFrom(x => x.LoanAmount))
                  .ForMember(x => x.ClientBankAccountId, y => y.MapFrom(x => x.ClientBankAccountId))
                   .ForMember(x => x.LoansTypesId, y => y.MapFrom(x => x.LoansTypesId))
                   .ForMember(x => x.InterestRate, y => y.MapFrom(x => x.InterestRate))
                   .ForMember(x => x.MonthlyPayment, y => y.MapFrom(x => x.MonthlyPayment))
                   .ForMember(x => x.LoanPeriod, y => y.MapFrom(x => x.LoanPeriod))
                   .ForMember(x => x.Income, y => y.MapFrom(x => x.Income))
                   .ForMember(x => x.LoanInstallment, y => y.MapFrom(x => x.LoanInstallment))
                   .ForMember(x => x.EmploymentStatus, y => y.MapFrom(x => x.EmploymentStatus));
        }
    }
}

