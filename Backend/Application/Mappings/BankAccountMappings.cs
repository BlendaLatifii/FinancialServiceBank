using AutoMapper;
using Domain.Entities;
using Domain.Models;

namespace Application.Mappings
{
    public class BankAccountMappings : Profile
    {
        public BankAccountMappings() 
        {
            CreateMap<BankAccount, BankAccountModel>()
                .ForMember(x => x.ID, y => y.MapFrom(x => x.ID))
                 .ForMember(x => x.AccountType, y => y.MapFrom(x => x.AccountType))
                  .ForMember(x => x.AccountDescription, y => y.MapFrom(x => x.AccountDescription))
                   .ForMember(x => x.CurrentBalance, y => y.MapFrom(x => x.CurrentBalance))
                    .ForMember(x => x.AccountNumberGenerated, y => y.MapFrom(x => x.AccountNumberGenerated))
                     .ForMember(x => x.DateCreated, y => y.MapFrom(x => x.DateCreated))
                      .ForMember(x => x.DateLastUpdated, y => y.MapFrom(x => x.DateLastUpdated))
                       .ForMember(x => x.Email, y => y.MapFrom(x => x.Email));
            CreateMap<BankAccountModel, BankAccount>()
                .ForMember(x => x.ID, y => y.MapFrom(x => x.ID))
                 .ForMember(x => x.AccountType, y => y.MapFrom(x => x.AccountType))
                  .ForMember(x => x.AccountDescription, y => y.MapFrom(x => x.AccountDescription))
				   .ForMember(x => x.CurrentBalance, y => y.MapFrom(x => x.CurrentBalance))
                    .ForMember(x => x.AccountNumberGenerated, y => y.MapFrom(x => x.AccountNumberGenerated))
					 .ForMember(x => x.DateCreated, y => y.MapFrom(x => x.DateCreated))
					  .ForMember(x => x.DateLastUpdated, y => y.MapFrom(x => x.DateLastUpdated))
					   .ForMember(x => x.Email, y => y.MapFrom(x => x.Email));

		}
    }
}