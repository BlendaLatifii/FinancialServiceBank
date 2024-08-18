using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class BankAccountConfiguration : IEntityTypeConfiguration<BankAccount>
    {
        public void Configure(EntityTypeBuilder<BankAccount> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.User)
               .WithMany(x => x.BankAccount)
              .HasForeignKey(x => x.UserId)
              .OnDelete(DeleteBehavior.NoAction); ;

        }
    }
}