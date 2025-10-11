using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AnimateDataStructure.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixNavigationPropertyForNodeRedplackTreeRemoveUnnecesaryFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsNodeRedColor",
                table: "RedBlackTrees");

            migrationBuilder.DropColumn(
                name: "ReadBlackTreeId",
                table: "NodeRedBlackTrees");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsNodeRedColor",
                table: "RedBlackTrees",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ReadBlackTreeId",
                table: "NodeRedBlackTrees",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
