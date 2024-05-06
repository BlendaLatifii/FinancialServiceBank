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
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                 .ForMember(x => x.AccountType, y => y.MapFrom(x => x.AccountType))
                  .ForMember(x => x.AccountDescription, y => y.MapFrom(x => x.AccountDescription));
            CreateMap<BankAccountModel, BankAccount>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                 .ForMember(x => x.AccountType, y => y.MapFrom(x => x.AccountType))
                  .ForMember(x => x.AccountDescription, y => y.MapFrom(x => x.AccountDescription));

		}
    }
}