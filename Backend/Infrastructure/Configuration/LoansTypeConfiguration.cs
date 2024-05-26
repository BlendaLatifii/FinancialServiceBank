using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class LoansTypeConfiguration : IEntityTypeConfiguration<LoansType>
    {
        public void Configure(EntityTypeBuilder<LoansType> builder)
        {
            builder.HasKey(x => x.Id);

        }
    }
}
