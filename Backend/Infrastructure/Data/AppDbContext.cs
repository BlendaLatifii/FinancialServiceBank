﻿using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Infrastructure.Data
{
    public class AppDbContext : IdentityDbContext<User,Role,Guid>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }
        public  DbSet<User> Users { get; set; } = default!;
        public  DbSet<Role> Roles { get; set; } = default!;
        public  DbSet<UserRole> UserRoles { get; set; } = default!;
        public DbSet<RefreshToken> RefreshTokens { get; set; } = default!;
        public DbSet<Branch> Branches { get; set; } = default!;
        public DbSet<Loan> Loans { get; set; } = default!;
        public DbSet<BankAccount> BankAccounts { get; set; } = default!;
        public DbSet<ContactUs> Contacts { get; set; } = default!;
        public DbSet<ClientBankAccount>ClientBankAccounts { get; set; } = default!;
        public DbSet<TypesOfCreditCards> TypesOfCreditCards { get; set; } = default!;
        public DbSet<Transaction> Transactions{ get; set; } = default!;
		public DbSet<CreditCards> CreditCards { get; set; } = default!;
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
