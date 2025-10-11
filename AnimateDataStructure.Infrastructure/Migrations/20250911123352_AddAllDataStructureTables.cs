using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AnimateDataStructure.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddAllDataStructureTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AvlTrees",
                columns: table => new
                {
                    AvlTreeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvlTrees", x => x.AvlTreeId);
                });

            migrationBuilder.CreateTable(
                name: "BinarySearchTrees",
                columns: table => new
                {
                    BinarySearchTreeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BinarySearchTrees", x => x.BinarySearchTreeId);
                });

            migrationBuilder.CreateTable(
                name: "MaxHeaps",
                columns: table => new
                {
                    MaxHeapId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaxHeaps", x => x.MaxHeapId);
                });

            migrationBuilder.CreateTable(
                name: "MinHeaps",
                columns: table => new
                {
                    MinHeapId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MinHeaps", x => x.MinHeapId);
                });

            migrationBuilder.CreateTable(
                name: "RedBlackTree",
                columns: table => new
                {
                    RedBlackTreeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsNodeRedColor = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RedBlackTree", x => x.RedBlackTreeId);
                });

            migrationBuilder.CreateTable(
                name: "NodeAvlTrees",
                columns: table => new
                {
                    NodeAvlTreeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<double>(type: "float", nullable: false),
                    AvlTreeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NodeAvlTrees", x => x.NodeAvlTreeId);
                    table.ForeignKey(
                        name: "FK_NodeAvlTrees_AvlTrees_AvlTreeId",
                        column: x => x.AvlTreeId,
                        principalTable: "AvlTrees",
                        principalColumn: "AvlTreeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NodeBinarySearchTrees",
                columns: table => new
                {
                    NodeBinarySearchTreeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<double>(type: "float", nullable: false),
                    BinarySearchTreeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NodeBinarySearchTrees", x => x.NodeBinarySearchTreeId);
                    table.ForeignKey(
                        name: "FK_NodeBinarySearchTrees_BinarySearchTrees_BinarySearchTreeId",
                        column: x => x.BinarySearchTreeId,
                        principalTable: "BinarySearchTrees",
                        principalColumn: "BinarySearchTreeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NodeMaxHeaps",
                columns: table => new
                {
                    NodeMaxHeapId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<double>(type: "float", nullable: false),
                    MaxHeapId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NodeMaxHeaps", x => x.NodeMaxHeapId);
                    table.ForeignKey(
                        name: "FK_NodeMaxHeaps_MaxHeaps_MaxHeapId",
                        column: x => x.MaxHeapId,
                        principalTable: "MaxHeaps",
                        principalColumn: "MaxHeapId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NodeMinHeaps",
                columns: table => new
                {
                    NodeMinHeapId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<double>(type: "float", nullable: false),
                    MinHeapId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NodeMinHeaps", x => x.NodeMinHeapId);
                    table.ForeignKey(
                        name: "FK_NodeMinHeaps_MinHeaps_MinHeapId",
                        column: x => x.MinHeapId,
                        principalTable: "MinHeaps",
                        principalColumn: "MinHeapId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NodeRedBlackTrees",
                columns: table => new
                {
                    NodeRedBlackTreeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<double>(type: "float", nullable: false),
                    ReadBlackTreeId = table.Column<int>(type: "int", nullable: false),
                    RedBlackTreeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NodeRedBlackTrees", x => x.NodeRedBlackTreeId);
                    table.ForeignKey(
                        name: "FK_NodeRedBlackTrees_RedBlackTree_RedBlackTreeId",
                        column: x => x.RedBlackTreeId,
                        principalTable: "RedBlackTree",
                        principalColumn: "RedBlackTreeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NodeAvlTrees_AvlTreeId",
                table: "NodeAvlTrees",
                column: "AvlTreeId");

            migrationBuilder.CreateIndex(
                name: "IX_NodeBinarySearchTrees_BinarySearchTreeId",
                table: "NodeBinarySearchTrees",
                column: "BinarySearchTreeId");

            migrationBuilder.CreateIndex(
                name: "IX_NodeMaxHeaps_MaxHeapId",
                table: "NodeMaxHeaps",
                column: "MaxHeapId");

            migrationBuilder.CreateIndex(
                name: "IX_NodeMinHeaps_MinHeapId",
                table: "NodeMinHeaps",
                column: "MinHeapId");

            migrationBuilder.CreateIndex(
                name: "IX_NodeRedBlackTrees_RedBlackTreeId",
                table: "NodeRedBlackTrees",
                column: "RedBlackTreeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NodeAvlTrees");

            migrationBuilder.DropTable(
                name: "NodeBinarySearchTrees");

            migrationBuilder.DropTable(
                name: "NodeMaxHeaps");

            migrationBuilder.DropTable(
                name: "NodeMinHeaps");

            migrationBuilder.DropTable(
                name: "NodeRedBlackTrees");

            migrationBuilder.DropTable(
                name: "AvlTrees");

            migrationBuilder.DropTable(
                name: "BinarySearchTrees");

            migrationBuilder.DropTable(
                name: "MaxHeaps");

            migrationBuilder.DropTable(
                name: "MinHeaps");

            migrationBuilder.DropTable(
                name: "RedBlackTree");
        }
    }
}
