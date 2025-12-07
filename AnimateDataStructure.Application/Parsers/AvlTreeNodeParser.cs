using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Parsers
{
    public class AvlTreeNodeParser : BaseNodeParser<NodeAvlTree>
    {
        protected override NodeAvlTree CreateNode(double value)
        {
            return new NodeAvlTree { Value = value };
        }
    }
}
