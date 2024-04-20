using AutoMapper;
using Domain.Entities;
using Domain.Models;

namespace Application.Mappings
{
    public class ClientMappings : Profile
    {
        public ClientMappings()
        {
            CreateMap<Client, ClientModel>()
                .ForMember(x => x.ClientAddress, y => y.MapFrom(x => x.ClientAddress))
                 .ForMember(x => x.ClientFirstName, y => y.MapFrom(x => x.ClientFirstName))
                  .ForMember(x => x.ClientMiddleName, y => y.MapFrom(x => x.ClientMiddleName))
                   .ForMember(x => x.ClientLastName, y => y.MapFrom(x => x.ClientLastName))
				    .ForMember(x => x.PersonalNumber, y => y.MapFrom(x => x.PersonalNumber))
					 .ForMember(x => x.City, y => y.MapFrom(x => x.City))
                      .ForMember(x => x.State, y => y.MapFrom(x => x.State))
                       .ForMember(x => x.ZipCode, y => y.MapFrom(x => x.ZipCode))
                        .ForMember(x => x.EmailAddress, y => y.MapFrom(x => x.EmailAddress))
                         .ForMember(x => x.PhoneNumber, y => y.MapFrom(x => x.PhoneNumber))
                          .ForMember(x => x.ClientDateOfBirth, y => y.MapFrom(x => x.ClientDateOfBirth));
            CreateMap<ClientModel, Client>()
                .ForMember(x => x.ClientAddress, y => y.MapFrom(x => x.ClientAddress))
                 .ForMember(x => x.ClientFirstName, y => y.MapFrom(x => x.ClientFirstName))
                  .ForMember(x => x.ClientMiddleName, y => y.MapFrom(x => x.ClientMiddleName))
                   .ForMember(x => x.ClientLastName, y => y.MapFrom(x => x.ClientLastName))
					.ForMember(x => x.PersonalNumber, y => y.MapFrom(x => x.PersonalNumber))
					 .ForMember(x => x.City, y => y.MapFrom(x => x.City))
					  .ForMember(x => x.State, y => y.MapFrom(x => x.State))
					   .ForMember(x => x.ZipCode, y => y.MapFrom(x => x.ZipCode))
						.ForMember(x => x.EmailAddress, y => y.MapFrom(x => x.EmailAddress))
						 .ForMember(x => x.PhoneNumber, y => y.MapFrom(x => x.PhoneNumber))
						  .ForMember(x => x.ClientDateOfBirth, y => y.MapFrom(x => x.ClientDateOfBirth));

		}
    }
}