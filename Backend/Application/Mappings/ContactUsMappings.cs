using AutoMapper;
using Domain.Entities;
using Domain.Models;

namespace Application.Mappings
{
    public class ContactUsMappings:Profile
    {
            public ContactUsMappings()
            {
                CreateMap<ContactUs, ContactUsModel>()
                    .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                     .ForMember(x => x.Name, y => y.MapFrom(x => x.Name))
                      .ForMember(x => x.Subject, y => y.MapFrom(x => x.Subject))
                       .ForMember(x => x.Message, y => y.MapFrom(x => x.Message));

                CreateMap<ContactUsModel, ContactUs>()
                   .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                    .ForMember(x => x.Name, y => y.MapFrom(x => x.Name))
                     .ForMember(x => x.Subject, y => y.MapFrom(x => x.Subject))
                      .ForMember(x => x.Message, y => y.MapFrom(x => x.Message));
            }
        }
    }