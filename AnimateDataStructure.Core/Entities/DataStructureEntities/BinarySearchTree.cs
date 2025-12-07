using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.Interfaces;

namespace AnimateDataStructure.Core.Entities.DataStructureEntities
{
    public class BinarySearchTree : IDataStructure<NodeBinarySearchTree>, IHasUserId
    {
        public int BinarySearchTreeId { get; set; } // Primary key

        public Guid TempGuid { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual ICollection<NodeBinarySearchTree> Nodes { get; set; } = new List<NodeBinarySearchTree>();

        public string UserId { get; set; } // Foreign key to ApplicationUser

        public virtual ApplicationUser User { get; set; } // Navigational property to ApplicationUser
    }
}
