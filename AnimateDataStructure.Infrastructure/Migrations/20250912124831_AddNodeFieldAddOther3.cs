using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AnimateDataStructure.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddNodeFieldAddOther3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NodeRedBlackTrees_RedBlackTree_RedBlackTreeId",
                table: "NodeRedBlackTrees");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RedBlackTree",
                table: "RedBlackTree");

            migrationBuilder.RenameTable(
                name: "RedBlackTree",
                newName: "RedBlackTrees");

            migrationBuilder.AddColumn<bool>(
                name: "IsRedNode",
                table: "NodeRedBlackTrees",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "MinHeaps",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "MaxHeaps",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "BinarySearchTrees",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "AvlTrees",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "RedBlackTrees",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RedBlackTrees",
                table: "RedBlackTrees",
                column: "RedBlackTreeId");

            migrationBuilder.CreateIndex(
                name: "IX_MinHeaps_UserId",
                table: "MinHeaps",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MaxHeaps_UserId",
                table: "MaxHeaps",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BinarySearchTrees_UserId",
                table: "BinarySearchTrees",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AvlTrees_UserId",
                table: "AvlTrees",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RedBlackTrees_UserId",
                table: "RedBlackTrees",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AvlTrees_AspNetUsers_UserId",
                table: "AvlTrees",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BinarySearchTrees_AspNetUsers_UserId",
                table: "BinarySearchTrees",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MaxHeaps_AspNetUsers_UserId",
                table: "MaxHeaps",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MinHeaps_AspNetUsers_UserId",
                table: "MinHeaps",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_NodeRedBlackTrees_RedBlackTrees_RedBlackTreeId",
                table: "NodeRedBlackTrees",
                column: "RedBlackTreeId",
                principalTable: "RedBlackTrees",
                principalColumn: "RedBlackTreeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RedBlackTrees_AspNetUsers_UserId",
                table: "RedBlackTrees",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AvlTrees_AspNetUsers_UserId",
                table: "AvlTrees");

            migrationBuilder.DropForeignKey(
                name: "FK_BinarySearchTrees_AspNetUsers_UserId",
                table: "BinarySearchTrees");

            migrationBuilder.DropForeignKey(
                name: "FK_MaxHeaps_AspNetUsers_UserId",
                table: "MaxHeaps");

            migrationBuilder.DropForeignKey(
                name: "FK_MinHeaps_AspNetUsers_UserId",
                table: "MinHeaps");

            migrationBuilder.DropForeignKey(
                name: "FK_NodeRedBlackTrees_RedBlackTrees_RedBlackTreeId",
                table: "NodeRedBlackTrees");

            migrationBuilder.DropForeignKey(
                name: "FK_RedBlackTrees_AspNetUsers_UserId",
                table: "RedBlackTrees");

            migrationBuilder.DropIndex(
                name: "IX_MinHeaps_UserId",
                table: "MinHeaps");

            migrationBuilder.DropIndex(
                name: "IX_MaxHeaps_UserId",
                table: "MaxHeaps");

            migrationBuilder.DropIndex(
                name: "IX_BinarySearchTrees_UserId",
                table: "BinarySearchTrees");

            migrationBuilder.DropIndex(
                name: "IX_AvlTrees_UserId",
                table: "AvlTrees");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RedBlackTrees",
                table: "RedBlackTrees");

            migrationBuilder.DropIndex(
                name: "IX_RedBlackTrees_UserId",
                table: "RedBlackTrees");

            migrationBuilder.DropColumn(
                name: "IsRedNode",
                table: "NodeRedBlackTrees");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MinHeaps");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MaxHeaps");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "BinarySearchTrees");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "AvlTrees");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "RedBlackTrees");

            migrationBuilder.RenameTable(
                name: "RedBlackTrees",
                newName: "RedBlackTree");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RedBlackTree",
                table: "RedBlackTree",
                column: "RedBlackTreeId");

            migrationBuilder.AddForeignKey(
                name: "FK_NodeRedBlackTrees_RedBlackTree_RedBlackTreeId",
                table: "NodeRedBlackTrees",
                column: "RedBlackTreeId",
                principalTable: "RedBlackTree",
                principalColumn: "RedBlackTreeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
