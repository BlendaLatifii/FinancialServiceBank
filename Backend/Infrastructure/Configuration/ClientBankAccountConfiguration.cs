
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

            builder.HasOne(x => x.Client)
                .WithMany(x => x.ClientBankAccounts)
                .HasForeignKey(x => x.ClientId)
                .IsRequired(true);

            builder.HasOne(x => x.BankAccount)
              .WithMany(x => x.ClientBankAccounts)
              .HasForeignKey(x => x.BankAccountId)
              .IsRequired(true);
        }
    }
}
