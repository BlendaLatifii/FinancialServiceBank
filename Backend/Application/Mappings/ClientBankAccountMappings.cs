using AutoMapper;
using Domain.Entities;
using Domain.Models;
namespace Application.Mappings
{
    public class ClientBankAccountMappings : Profile
    {
        public ClientBankAccountMappings()
        {
            CreateMap<ClientBankAccount, ClientBankAccountModel>()
                   .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                   .ForMember(x => x.AccountNumberGeneratedID, y => y.MapFrom(x => x.AccountNumberGeneratedID))
                   .ForMember(x => x.ClientId, y => y.MapFrom(x => x.ClientId))
                   .ForMember(x => x.BankAccountId, y => y.MapFrom(x => x.BankAccountId))
                   .ForMember(x => x.BranchId, y => y.MapFrom(x => x.BranchId))
                   .ForMember(x => x.PersonalNumber, y => y.MapFrom(x => x.Client.PersonalNumberId))
                   .ForMember(x => x.CurrentBalance, y => y.MapFrom(x => x.CurrentBalance))
                   .ForMember(x => x.DateCreated, y => y.MapFrom(x => x.DateCreated))
                   .ForMember(x => x.DateLastUpdated, y => y.MapFrom(x => x.DateLastUpdated));

            CreateMap<ClientBankAccountModel, ClientBankAccount>()
                  .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                  .ForMember(x => x.AccountNumberGeneratedID, y => y.MapFrom(x => x.AccountNumberGeneratedID))
                  .ForMember(x => x.ClientId, y => y.MapFrom(x => x.ClientId))
                  .ForMember(x => x.BankAccountId, y => y.MapFrom(x => x.BankAccountId))
                  .ForMember(x => x.BranchId, y => y.MapFrom(x => x.BranchId))
                  .ForMember(x => x.CurrentBalance, y => y.MapFrom(x => x.CurrentBalance))
                  .ForMember(x => x.DateCreated, y => y.MapFrom(x => x.DateCreated))
                  .ForMember(x => x.DateLastUpdated, y => y.MapFrom(x => x.DateLastUpdated));
        }
    }
}
