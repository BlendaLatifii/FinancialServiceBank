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
				 .ForMember(x => x.CVV, y => y.MapFrom(x => x.CVV))
				  .ForMember(x => x.AccountNumber, y => y.MapFrom(x => x.AccountNumber))
				   .ForMember(x => x.TypesOfCreditCardsID, y=> y.MapFrom(x => x.TypesOfCreditCardsID));
			CreateMap<CreditCardsModel, CreditCards>()
				.ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
				 .ForMember(x => x.CVV, y => y.MapFrom(x => x.CVV))
				  .ForMember(x => x.AccountNumber, y => y.MapFrom(x => x.AccountNumber))
				   .ForMember(x => x.TypesOfCreditCardsID, y => y.MapFrom(x => x.TypesOfCreditCardsID));
		}
	}
}
