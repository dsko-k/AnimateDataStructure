using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Parsers
{
    public class MaxHeapNodeParser : BaseNodeParser<NodeMaxHeap>
    {
        protected override NodeMaxHeap CreateNode(double value)
        {
            return new NodeMaxHeap { Value = value };
        }
    }
}
