
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class ClientBankAccountConfiguration : IEntityTypeConfiguration<ClientBankAccount>
    {
        public void Configure(EntityTypeBuilder<ClientBankAccount> builder)
        {
            builder.HasKey(x => x.AccountNumberGeneratedID);

            builder.HasOne(x => x.Client)
                .WithMany(x => x.ClientBankAccounts)
               .HasForeignKey(x => x.Id);

            builder.HasOne(x => x.BankAccount)
              .WithMany(x => x.ClientBankAccounts)
              .HasForeignKey(x => x.Id);
        }
    }
}
