using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.Interfaces;

namespace AnimateDataStructure.Core.Entities.DataStructureEntities
{
    public class MaxHeap : IDataStructure<NodeMaxHeap>, IHasUserId
    {
        public int MaxHeapId { get; set; } // Primary key

        public Guid TempGuid { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual ICollection<NodeMaxHeap> Nodes { get; set; } = new List<NodeMaxHeap>();

        public string UserId { get; set; } // Foreign key to ApplicationUser

        public virtual ApplicationUser User { get; set; } // Navigational property to ApplicationUser
    }
}
