﻿using AutoMapper;
using Domain.Entities;
using Domain.Models;

namespace Application.Mappings
{
    public class TransactionMappings : Profile
    {
        public TransactionMappings()
        {
            CreateMap<Transaction, TransactionModel>()
              .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
               .ForMember(x => x.TransactionAmount, y => y.MapFrom(x => x.TransactionAmount))
                  .ForMember(x => x.SourceClientBankAccountId, y => y.MapFrom(x => x.SourceClientBankAccountId))
                 .ForMember(x => x.DestinationClientBankAccountId, y => y.MapFrom(x => x.DestinationClientBankAccountId))
                 .ForMember(x => x.SourceClientBankAccount, y => y.MapFrom(x => x.SourceClientBankAccount.AccountNumberGeneratedID))
                 .ForMember(x => x.DestinationClientBankAccount, y => y.MapFrom(x => x.DestinationClientBankAccount.AccountNumberGeneratedID))
                  .ForMember(x => x.TransactionType, y => y.MapFrom(x => x.TransactionType))
                  .ForMember(x=>x.TransactionDate, y=> y.MapFrom(x=>x.TransactionDate));


            CreateMap<TransactionModel, Transaction>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id ?? Guid.Empty))
                 .ForMember(x => x.TransactionAmount, y => y.MapFrom(x => x.TransactionAmount))
                   .ForMember(x => x.SourceClientBankAccountId, y => y.MapFrom(x => x.SourceClientBankAccountId))
                  .ForMember(x => x.DestinationClientBankAccountId, y => y.MapFrom(x => x.DestinationClientBankAccountId))
                    .ForMember(x => x.TransactionType, y => y.MapFrom(x => x.TransactionType))
                  .ForMember(x => x.TransactionDate, y => y.MapFrom(x => x.TransactionDate))
                  .ForAllOtherMembers(x=> x.Ignore());
                  

        }
    }
}