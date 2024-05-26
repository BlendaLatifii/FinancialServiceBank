using AutoMapper;
using Domain.Entities;
using Domain.Models;

namespace Application.Mappings
{
	public class TypesOfCreditCardsMappings : Profile
	{
		public TypesOfCreditCardsMappings()
		{
			CreateMap<TypesOfCreditCards, TypesOfCreditCardsModel>()
				.ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
				 .ForMember(x => x.Name, y => y.MapFrom(x => x.Name))
				  .ForMember(x => x.Description, y => y.MapFrom(x => x.Description));
			CreateMap<TypesOfCreditCardsModel, TypesOfCreditCards>()
				.ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
				 .ForMember(x => x.Name, y => y.MapFrom(x => x.Name))
				  .ForMember(x => x.Description, y => y.MapFrom(x => x.Description));

		}
	}
}