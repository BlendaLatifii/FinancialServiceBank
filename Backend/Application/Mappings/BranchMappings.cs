using AutoMapper;
using Domain.Entities;
using Domain.Models;

namespace Application.Mappings
{
    public class BranchMappings : Profile
    {
        public BranchMappings()
        {
            CreateMap<Branch, BranchModel>()
                .ForMember(x => x.BranchId, y => y.MapFrom(x => x.BranchId))
                 .ForMember(x => x.BranchName, y => y.MapFrom(x => x.BranchName))
                 .ForMember(x => x.Adress, y => y.MapFrom(x => x.Adress))
                 .ForMember(x => x.PhoneNumber, y => y.MapFrom(x => x.PhoneNumber))
                 .ForMember(x => x.Opened, y => y.MapFrom(x => x.Opened));

            CreateMap<BranchModel, Branch>()
               .ForMember(x => x.BranchId, y => y.MapFrom(x => x.BranchId))
                .ForMember(x => x.BranchName, y => y.MapFrom(x => x.BranchName))
                .ForMember(x => x.Adress, y => y.MapFrom(x => x.Adress))
                .ForMember(x => x.PhoneNumber, y => y.MapFrom(x => x.PhoneNumber))
                .ForMember(x => x.Opened, y => y.MapFrom(x => x.Opened));
        }
    }
}