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
                .ForMember(x => x.UserId, y => y.MapFrom(x => x.UserId))
                .ForMember(x => x.UserName, y => y.MapFrom(x => x.User.UserName))
                .ForMember(x => x.AccountType, y => y.MapFrom(x => x.AccountType))
                .ForMember(x => x.AccountDescription, y => y.MapFrom(x => x.AccountDescription))
                .ForMember(x => x.TarifaMirembajtese, y => y.MapFrom(x => x.TarifaMirembajtese));
            CreateMap<BankAccountModel, BankAccount>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                .ForMember(x => x.UserId, y => y.MapFrom(x => x.UserId))
                .ForMember(x => x.AccountType, y => y.MapFrom(x => x.AccountType))
                .ForMember(x => x.AccountDescription, y => y.MapFrom(x => x.AccountDescription))
                .ForMember(x => x.TarifaMirembajtese, y => y.MapFrom(x => x.TarifaMirembajtese));

		}
    }
}