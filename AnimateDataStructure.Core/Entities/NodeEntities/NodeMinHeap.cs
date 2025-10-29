using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Entities.NodeEntities
{
    public class NodeMinHeap : INode, IHasPrimaryKeyId
    {
        public int NodeMinHeapId { get; set; } // Primary key (not the same as nodeId in UI)

        public int PrimaryKeyId => NodeMinHeapId;

        public double Value { get; set; }

        public int MinHeapId { get; set; } // Foreign key to link back to the parent DataStructure

        public virtual MinHeap MinHeap { get; set; }
    }
}
