using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PCM_Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddMemberSmarterProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "030_Members");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "030_Members");

            migrationBuilder.RenameColumn(
                name: "RankLevel",
                table: "030_Members",
                newName: "DuprRank");

            migrationBuilder.AddColumn<decimal>(
                name: "AccountBalance",
                table: "030_Members",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountBalance",
                table: "030_Members");

            migrationBuilder.RenameColumn(
                name: "DuprRank",
                table: "030_Members",
                newName: "RankLevel");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "030_Members",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "030_Members",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
