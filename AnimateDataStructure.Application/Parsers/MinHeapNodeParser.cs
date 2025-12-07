using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Parsers
{
    public class MinHeapNodeParser : BaseNodeParser<NodeMinHeap>
    {
        protected override NodeMinHeap CreateNode(double value)
        {
            return new NodeMinHeap { Value = value };
        }
    }
}
