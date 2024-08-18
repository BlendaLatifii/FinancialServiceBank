using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Configuration
{
    public class ContactUsConfiguration: IEntityTypeConfiguration<ContactUs>
    {

        public void Configure(EntityTypeBuilder<ContactUs> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.User)
                .WithMany(x => x.ContactUs)
               .HasForeignKey(x => x.UserId);
        }
    }
}
