using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class edit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CreditCards_TypesOfCreditCards_Id",
                table: "CreditCards");

            migrationBuilder.DropColumn(
                name: "AccountNumber",
                table: "CreditCards");

            migrationBuilder.AddColumn<Guid>(
                name: "ClientBankAccountId",
                table: "CreditCards",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_CreditCards_ClientBankAccountId",
                table: "CreditCards",
                column: "ClientBankAccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CreditCards_TypesOfCreditCardsID",
                table: "CreditCards",
                column: "TypesOfCreditCardsID");

            migrationBuilder.AddForeignKey(
                name: "FK_CreditCards_ClientBankAccounts_ClientBankAccountId",
                table: "CreditCards",
                column: "ClientBankAccountId",
                principalTable: "ClientBankAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CreditCards_TypesOfCreditCards_TypesOfCreditCardsID",
                table: "CreditCards",
                column: "TypesOfCreditCardsID",
                principalTable: "TypesOfCreditCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CreditCards_ClientBankAccounts_ClientBankAccountId",
                table: "CreditCards");

            migrationBuilder.DropForeignKey(
                name: "FK_CreditCards_TypesOfCreditCards_TypesOfCreditCardsID",
                table: "CreditCards");

            migrationBuilder.DropIndex(
                name: "IX_CreditCards_ClientBankAccountId",
                table: "CreditCards");

            migrationBuilder.DropIndex(
                name: "IX_CreditCards_TypesOfCreditCardsID",
                table: "CreditCards");

            migrationBuilder.DropColumn(
                name: "ClientBankAccountId",
                table: "CreditCards");

            migrationBuilder.AddColumn<string>(
                name: "AccountNumber",
                table: "CreditCards",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_CreditCards_TypesOfCreditCards_Id",
                table: "CreditCards",
                column: "Id",
                principalTable: "TypesOfCreditCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
