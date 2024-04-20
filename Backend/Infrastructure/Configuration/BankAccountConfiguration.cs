using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class BankAccountConfiguration : IEntityTypeConfiguration<BankAccount>
    {
        public void Configure(EntityTypeBuilder<BankAccount> builder)
        {
            builder.HasKey(x => x.ID);
            
           /* builder.HasOne(x => x.Client) 
            .WithMany(x => x.BankAccount)     
            .HasForeignKey(x => x.ClientId)
            .IsRequired(); */

        }
    }
}