using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class edit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PersonalNumberId",
                table: "Clients",
                newName: "PersonalNumberID");

            migrationBuilder.RenameColumn(
                name: "MiddleName",
                table: "Clients",
                newName: "ClientMiddleName");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Clients",
                newName: "ClientLastName");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Clients",
                newName: "ClientFirstName");
        }
    }
}
