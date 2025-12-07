using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.Interfaces;

namespace AnimateDataStructure.Core.Entities.DataStructureEntities
{
    public class AvlTree : IDataStructure<NodeAvlTree>, IHasUserId
    {
        public int AvlTreeId { get; set; } // Primary key

        public Guid TempGuid { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual ICollection<NodeAvlTree> Nodes { get; set; } = new List<NodeAvlTree>(); // Navigational property to datastructure

        public string UserId { get; set; } // Foreign key to ApplicationUser

        public virtual ApplicationUser User { get; set; } // Navigational property to ApplicationUser
    }
}
