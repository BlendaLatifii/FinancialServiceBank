﻿
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
	public class CreditCardsConfiguration : IEntityTypeConfiguration<CreditCards>
	{
		public void Configure(EntityTypeBuilder<CreditCards> builder)
		{
			builder.HasKey(x => x.Id);

			builder.HasOne(x => x.TypesOfCreditCards)
				.WithMany(x => x.CreditCards)
			   .HasForeignKey(x => x.TypesOfCreditCardsID);

			builder.HasOne(x => x.ClientBankAccount)
				.WithOne(x => x.CreditCards)
				.HasForeignKey<CreditCards>(x => x.ClientBankAccountId);
			    
		}
	}
}