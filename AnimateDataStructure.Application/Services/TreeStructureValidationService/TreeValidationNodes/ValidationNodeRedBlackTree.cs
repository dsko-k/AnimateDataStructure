using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationNodes
{
    public class ValidationNodeRedBlackTree
    {
        public double Value { get; set; }

        public bool IsRedNode { get; set; }
                
        public ValidationNodeRedBlackTree Parent { get; set; }

        public ValidationNodeRedBlackTree Left { get; set; }

        public ValidationNodeRedBlackTree Right { get; set; }
        

        // Optional: Keep the original ID for debugging/error reporting if needed
        public int OriginalNodeId { get; set; }

        public ValidationNodeRedBlackTree(double value, bool isRed, int originalId, ValidationNodeRedBlackTree parent)
        {
            Value = value;
            IsRedNode = isRed;
            OriginalNodeId = originalId;
            Parent = parent;
        }
    }
}
