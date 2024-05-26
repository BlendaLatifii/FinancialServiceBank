
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
	public class TypesOfCreditCardsConfiguration : IEntityTypeConfiguration<TypesOfCreditCards>
	{
		public void Configure(EntityTypeBuilder<TypesOfCreditCards> builder)
		{
			builder.HasKey(x => x.Id);
		}
	}
}
