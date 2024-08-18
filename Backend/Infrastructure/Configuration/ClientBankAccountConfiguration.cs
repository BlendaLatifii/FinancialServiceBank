
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class ClientBankAccountConfiguration : IEntityTypeConfiguration<ClientBankAccount>
    {
        public void Configure(EntityTypeBuilder<ClientBankAccount> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.AccountNumberGeneratedID).IsUnique();
            builder.HasOne(x => x.User)
               .WithMany(x => x.ClientBankAccounts)
              .HasForeignKey(x => x.UserId);

            builder.HasOne(x => x.Client)
                .WithMany(x => x.ClientBankAccounts)
                .HasForeignKey(x => x.ClientId)
                .OnDelete(DeleteBehavior.NoAction)
                .IsRequired(true);

            builder.HasOne(x => x.BankAccount)
              .WithMany(x => x.ClientBankAccounts)
              .HasForeignKey(x => x.BankAccountId)
              .OnDelete(DeleteBehavior.NoAction)
              .IsRequired(true);

            builder.HasOne(x => x.Branch)
             .WithMany(x => x.ClientBankAccounts)
             .HasForeignKey(x => x.BranchId)
             .OnDelete(DeleteBehavior.NoAction)
             .IsRequired(true);


        }
    }
}
