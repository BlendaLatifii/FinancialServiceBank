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
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                .ForMember(x => x.UserId, y => y.MapFrom(x => x.UserId))
                .ForMember(x => x.UserName, y => y.MapFrom(x => x.User.UserName))
                .ForMember(x => x.PersonalNumberId, y => y.MapFrom(x => x.PersonalNumberId))
                .ForMember(x => x.FirstName, y => y.MapFrom(x => x.FirstName))
                .ForMember(x => x.MiddleName, y => y.MapFrom(x => x.MiddleName))
                .ForMember(x => x.LastName, y => y.MapFrom(x => x.LastName))
                .ForMember(x => x.PhoneNumber, y => y.MapFrom(x => x.PhoneNumber))
                .ForMember(x => x.EmailAddress, y => y.MapFrom(x => x.EmailAddress))
                .ForMember(x => x.City, y => y.MapFrom(x => x.City))
                .ForMember(x => x.State, y => y.MapFrom(x => x.State))
                      .ForMember(x => x.City, y => y.MapFrom(x => x.City))
                       .ForMember(x => x.ZipCode, y => y.MapFrom(x => x.ZipCode));
            CreateMap<ClientModel, Client>()
               .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
               .ForMember(x => x.UserId, y => y.MapFrom(x => x.UserId))
               .ForMember(x => x.PersonalNumberId, y => y.MapFrom(x => x.PersonalNumberId))
               .ForMember(x => x.FirstName, y => y.MapFrom(x => x.FirstName))
               .ForMember(x => x.MiddleName, y => y.MapFrom(x => x.MiddleName))
               .ForMember(x => x.LastName, y => y.MapFrom(x => x.LastName))
               .ForMember(x => x.PhoneNumber, y => y.MapFrom(x => x.PhoneNumber))
               .ForMember(x => x.EmailAddress, y => y.MapFrom(x => x.EmailAddress))
               .ForMember(x => x.State, y => y.MapFrom(x => x.State))
               .ForMember(x => x.City, y => y.MapFrom(x => x.City))
			   .ForMember(x => x.ZipCode, y => y.MapFrom(x => x.ZipCode));

		}
    }
}