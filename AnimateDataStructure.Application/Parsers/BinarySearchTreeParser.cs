using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Parsers
{
    public class BinarySearchTreeParser : BaseNodeParser<NodeBinarySearchTree>
    {
        protected override NodeBinarySearchTree CreateNode(double value)
        {
            return new NodeBinarySearchTree { Value = value };
        }
    }
}
