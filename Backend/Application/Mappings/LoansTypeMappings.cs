using AutoMapper;
using Domain.Entities;
using Domain.Models;

namespace Application.Mappings
{
    public class LoansTypeMappings : Profile
    {
        public LoansTypeMappings()
        {
            CreateMap<LoansType, LoansTypeModel>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                 .ForMember(x => x.LoanType, y => y.MapFrom(x => x.LoanType));
            CreateMap<LoansTypeModel, LoansType>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                 .ForMember(x => x.LoanType, y => y.MapFrom(x => x.LoanType));

        }
    }
}
