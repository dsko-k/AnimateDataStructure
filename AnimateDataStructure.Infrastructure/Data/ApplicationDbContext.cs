using AnimateDataStructure.Core.Entities;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AnimateDataStructure.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<BinarySearchTree> BinarySearchTrees { get; set; }

        public DbSet<AvlTree> AvlTrees { get; set; }

        public DbSet<MaxHeap> MaxHeaps { get; set; }

        public DbSet<MinHeap> MinHeaps { get; set; }

        public DbSet<RedBlackTree> RedBlackTrees { get; set; }


        public DbSet<NodeBinarySearchTree> NodeBinarySearchTrees { get; set; }

        public DbSet<NodeAvlTree> NodeAvlTrees { get; set; }

        public DbSet<NodeMaxHeap> NodeMaxHeaps { get; set; }

        public DbSet<NodeMinHeap> NodeMinHeaps { get; set; }

        public DbSet<NodeRedBlackTree> NodeRedBlackTrees { get; set; }


        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

    }
}
