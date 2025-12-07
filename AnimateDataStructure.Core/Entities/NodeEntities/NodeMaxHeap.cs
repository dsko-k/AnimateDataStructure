using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Interfaces;

namespace AnimateDataStructure.Core.Entities.NodeEntities
{
    public class NodeMaxHeap : INode, IHasPrimaryKeyId
    {
        public int NodeMaxHeapId { get; set; } // Primary key (not the same as nodeId in UI)

        public int PrimaryKeyId => NodeMaxHeapId;

        public double Value { get; set; }

        public int MaxHeapId { get; set; } // Foreign key to link back to the parent DataStructure

        public virtual MaxHeap MaxHeap { get; set; }
    }
}
