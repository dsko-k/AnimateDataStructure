using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AnimateDataStructure.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddTempGuidToTrees : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TempGuid",
                table: "RedBlackTree",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TempGuid",
                table: "MinHeaps",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TempGuid",
                table: "MaxHeaps",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TempGuid",
                table: "BinarySearchTrees",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TempGuid",
                table: "AvlTrees",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TempGuid",
                table: "RedBlackTree");

            migrationBuilder.DropColumn(
                name: "TempGuid",
                table: "MinHeaps");

            migrationBuilder.DropColumn(
                name: "TempGuid",
                table: "MaxHeaps");

            migrationBuilder.DropColumn(
                name: "TempGuid",
                table: "BinarySearchTrees");

            migrationBuilder.DropColumn(
                name: "TempGuid",
                table: "AvlTrees");
        }
    }
}
