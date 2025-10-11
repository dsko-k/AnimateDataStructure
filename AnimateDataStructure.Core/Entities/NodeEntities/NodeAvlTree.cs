using AnimateDataStructure.Core.Entities.DataStructureEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Entities.NodeEntities
{
    public class NodeAvlTree : INode
    {
        public int NodeAvlTreeId { get; set; } // Primary key (not the same as nodeId in UI)

        public double Value { get; set; }

        public int AvlTreeId { get; set; } // Foreign key to link back to the parent DataStructure

        public virtual AvlTree AvlTree { get; set; }
    }
}
