using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Configuration
{
    public class LoanConfiguration : IEntityTypeConfiguration<Loan>
    {

        public void Configure(EntityTypeBuilder<Loan> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.ClientBankAccount)
                .WithOne(x => x.Loans)
                .HasForeignKey<Loan>(x => x.ClientBankAccountId);
        }
    }

}