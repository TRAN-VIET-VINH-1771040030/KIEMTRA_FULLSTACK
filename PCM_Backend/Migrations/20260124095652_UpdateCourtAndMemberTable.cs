using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PCM_Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCourtAndMemberTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CourtName",
                table: "030_Courts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "PricePerHour",
                table: "030_Courts",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "030_Courts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CourtName",
                table: "030_Courts");

            migrationBuilder.DropColumn(
                name: "PricePerHour",
                table: "030_Courts");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "030_Courts");
        }
    }
}
