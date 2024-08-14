using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class BranchConfiguration : IEntityTypeConfiguration<Branch>
    {
        public void Configure(EntityTypeBuilder<Branch> builder)
        {
            builder.HasKey(x => x.BranchId);
            builder.HasOne(x => x.Users)
                .WithMany(x => x.Branches)
               .HasForeignKey(x => x.UserId);
        }
    }
}