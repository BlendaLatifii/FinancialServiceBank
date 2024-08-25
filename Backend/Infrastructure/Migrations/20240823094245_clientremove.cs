using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class clientremove : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientBankAccounts_AspNetUsers_UserId",
                table: "ClientBankAccounts");

            migrationBuilder.AlterColumn<Guid>(
                name: "ClientId",
                table: "ClientBankAccounts",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "PersonalNumberId",
                table: "AspNetUsers",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_PersonalNumberId",
                table: "AspNetUsers",
                column: "PersonalNumberId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientBankAccounts_AspNetUsers_UserId",
                table: "ClientBankAccounts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientBankAccounts_AspNetUsers_UserId",
                table: "ClientBankAccounts");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_PersonalNumberId",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<Guid>(
                name: "ClientId",
                table: "ClientBankAccounts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PersonalNumberId",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_ClientBankAccounts_AspNetUsers_UserId",
                table: "ClientBankAccounts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
