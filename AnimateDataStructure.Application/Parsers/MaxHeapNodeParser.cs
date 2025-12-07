using AnimateDataStructure.Core.Entities.NodeEntities;

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
