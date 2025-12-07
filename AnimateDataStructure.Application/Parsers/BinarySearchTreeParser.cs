using AnimateDataStructure.Core.Entities.NodeEntities;

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
