using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Parsers
{
    public class MinHeapNodeParser : BaseNodeParser<NodeMinHeap>
    {
        protected override NodeMinHeap CreateNode(double value)
        {
            return new NodeMinHeap { Value = value };
        }
    }
}
