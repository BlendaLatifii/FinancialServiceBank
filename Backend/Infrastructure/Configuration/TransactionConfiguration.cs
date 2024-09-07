using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class TransactionConfiguration: IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.TransactionType);
            builder.HasOne(x => x.User)
               .WithMany(x => x.Transactions)
              .HasForeignKey(x => x.UserId);
            builder.HasOne(x => x.SourceClientBankAccount)
               .WithMany(x => x.SendTransations)
               .HasForeignKey(x => x.SourceClientBankAccountId)
               .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(x => x.DestinationClientBankAccount)
              .WithMany(x => x.RecivedTransations)
              .HasForeignKey(x => x.DestinationClientBankAccountId)
              .OnDelete(DeleteBehavior.NoAction);
        }

       
    }
}
