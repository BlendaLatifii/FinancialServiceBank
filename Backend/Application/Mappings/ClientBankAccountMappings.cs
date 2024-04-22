using AutoMapper;
using Domain.Entities;
using Domain.Models;
namespace Application.Mappings
{
    public class ClientBankAccountMappings:Profile
    {
        public ClientBankAccountMappings()
        {
            CreateMap<ClientBankAccount, ClientBankAccountModel>()
                .ForMember(x => x.AccountNumberGeneratedID, y => y.MapFrom(x => x.AccountNumberGeneratedID))
                 .ForMember(x => x.PersonalNumberID, y => y.MapFrom(x => x.PersonalNumberID))
                  .ForMember(x => x.AccountTypeID, y => y.MapFrom(x => x.AccountTypeID))
                   .ForMember(x => x.CurrentBalance, y => y.MapFrom(x => x.CurrentBalance))
                    .ForMember(x => x.DateCreated, y => y.MapFrom(x => x.DateCreated))
                     .ForMember(x => x.DateLastUpdated, y => y.MapFrom(x => x.DateLastUpdated));
            CreateMap<ClientBankAccountModel, ClientBankAccount>()
                .ForMember(x => x.AccountNumberGeneratedID, y => y.MapFrom(x => x.AccountNumberGeneratedID))
                 .ForMember(x => x.PersonalNumberID, y => y.MapFrom(x => x.PersonalNumberID))
                  .ForMember(x => x.AccountTypeID, y => y.MapFrom(x => x.AccountTypeID))
                   .ForMember(x => x.CurrentBalance, y => y.MapFrom(x => x.CurrentBalance))
                    .ForMember(x => x.DateCreated, y => y.MapFrom(x => x.DateCreated))
                     .ForMember(x => x.DateLastUpdated, y => y.MapFrom(x => x.DateLastUpdated));

        }
    }
}
