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
                 .ForMember(x => x.AccountTypeID, y => y.MapFrom(x => x.AccountTypeID))
                  .ForMember(x => x.AccountDescription, y => y.MapFrom(x => x.AccountDescription));
            CreateMap<BankAccountModel, BankAccount>()
                 .ForMember(x => x.AccountTypeID, y => y.MapFrom(x => x.AccountTypeID))
                  .ForMember(x => x.AccountDescription, y => y.MapFrom(x => x.AccountDescription));

		}
    }
}