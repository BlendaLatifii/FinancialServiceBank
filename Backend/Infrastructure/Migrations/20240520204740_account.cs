using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class account : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Krijo tabelën Clients me kolonën GUID si çelës primar
            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PersonalNumberId = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    MiddleName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailAddress = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    State = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    City = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ZipCode = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),

                    // Shto këtu kolonat e tjera që dëshiron
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.Id);
                    table.UniqueConstraint("AK_Clients_PersonalNumberId", x => x.PersonalNumberId);
                });

            migrationBuilder.CreateTable(
                name: "ClientBankAccounts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AccountNumberGeneratedID= table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    DateCreated= table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    DateLastUpdated= table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    CurrentBalance= table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientBankAccounts", x => x.AccountId);
                    table.ForeignKey(
                        name: "FK_ClientBankAccounts_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientBankAccounts_BankAccounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "BankAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            // Krijo indeksin në kolonën PersonalNumberId në tabelën Clients
            migrationBuilder.CreateIndex(
                name: "IX_Clients_PersonalNumberId",
                table: "Clients",
                column: "PersonalNumberId",
                unique: true);

            // Krijo indeksin në kolonën ClientId në tabelën ClientBankAccounts
            migrationBuilder.CreateIndex(
                name: "IX_ClientBankAccounts_ClientId",
                table: "ClientBankAccounts",
                column: "ClientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Fshi tabelat nëse migrimi bëhet 'down'
            migrationBuilder.DropTable(
                name: "ClientBankAccounts");

            migrationBuilder.DropTable(
                name: "Clients");
        }
    }
}
