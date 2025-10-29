using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Entities.NodeEntities
{
    public class NodeBinarySearchTree : INode, IHasPrimaryKeyId
    {
        public int NodeBinarySearchTreeId { get; set; } // Primary key (not the same as nodeId in UI)

        public int PrimaryKeyId => NodeBinarySearchTreeId;

        public double Value { get; set; }
                
        public int BinarySearchTreeId { get; set; } // Foreign key to link back to the parent DataStructure

        public virtual BinarySearchTree BinarySearchTree { get; set; }
    }
}
