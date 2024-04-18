using AutoMapper;
using Domain.Entities;
using Domain.Models;

namespace Application.Mappings
{
    public class UserMappings : Profile
    {
        public UserMappings()
        {
            CreateMap<User, UserModel>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                 .ForMember(x => x.UserName, y => y.MapFrom(x => x.UserName))
                  .ForMember(x => x.LastName, y => y.MapFrom(x => x.LastName))
                   .ForMember(x => x.Email, y => y.MapFrom(x => x.Email));

            CreateMap<UserModel, User>()
               .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                .ForMember(x => x.UserName, y => y.MapFrom(x => x.UserName))
                 .ForMember(x => x.LastName, y => y.MapFrom(x => x.LastName))
                  .ForMember(x => x.Email, y => y.MapFrom(x => x.Email));
        }
    }
}
