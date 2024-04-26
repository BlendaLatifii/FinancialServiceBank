using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class Clients : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BankAccounts",
                columns: table => new
                {
                    AccountTypeID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AccountDescription = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankAccounts", x => x.AccountTypeID);
                });

            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    PersonalNumberID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClientFirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClientMiddleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClientLastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ZipCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmailAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClientDateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.PersonalNumberID);
                });

            migrationBuilder.CreateTable(
                name: "Loans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LlojiIKredise = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShumaEKredise = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NormaEInteresit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    KohaEKredise = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MetodaEKredise = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rroga6mujore = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    KestiIKredise = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    StatusiIPunesise = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Loans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ClientBankAccounts",
                columns: table => new
                {
                    AccountNumberGeneratedID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PersonalNumberID = table.Column<int>(type: "int", nullable: false),
                    AccountTypeID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CurrentBalance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateLastUpdated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientBankAccounts", x => x.AccountNumberGeneratedID);
                    table.ForeignKey(
                        name: "FK_ClientBankAccounts_BankAccounts_AccountTypeID",
                        column: x => x.AccountTypeID,
                        principalTable: "BankAccounts",
                        principalColumn: "AccountTypeID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientBankAccounts_Clients_PersonalNumberID",
                        column: x => x.PersonalNumberID,
                        principalTable: "Clients",
                        principalColumn: "PersonalNumberID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientBankAccounts_AccountTypeID",
                table: "ClientBankAccounts",
                column: "AccountTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_ClientBankAccounts_PersonalNumberID",
                table: "ClientBankAccounts",
                column: "PersonalNumberID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientBankAccounts");

            migrationBuilder.DropTable(
                name: "Loans");

            migrationBuilder.DropTable(
                name: "BankAccounts");

            migrationBuilder.DropTable(
                name: "Clients");
        }
    }
}
