using AutoMapper;
using Domain.Entities;
using Domain.Models;

namespace Application.Mappings
{
    public class CreditCardsMappings : Profile
    {
        public CreditCardsMappings()
        {
            CreateMap<CreditCards, CreditCardsModel>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                  .ForMember(x => x.ClientBankAccountId, y => y.MapFrom(x => x.ClientBankAccountId))
                  .ForMember(x => x.Balance, y => y.MapFrom(x => x.ClientBankAccount.CurrentBalance))
                  .ForMember(x => x.Limite, y => y.MapFrom(x => x.Limite))
                  .ForMember(x => x.ClientAccountNumber, y => y.MapFrom(x => x.ClientBankAccount.AccountNumberGeneratedID))
                   .ForMember(x => x.TypesOfCreditCardsID, y => y.MapFrom(x => x.TypesOfCreditCardsID))
                   .ForMember(x => x.ValidThru, y => y.MapFrom(x => x.ValidThru));
            CreateMap<CreditCardsModel, CreditCards>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                  .ForMember(x => x.ClientBankAccountId, y => y.MapFrom(x => x.ClientBankAccountId))
                   .ForMember(x => x.TypesOfCreditCardsID, y => y.MapFrom(x => x.TypesOfCreditCardsID))
                   .ForMember(x => x.Limite, y => y.MapFrom(x => x.Limite))
                   .ForMember(x => x.ValidThru, y => y.MapFrom(x => x.ValidThru));
        }
    }
}