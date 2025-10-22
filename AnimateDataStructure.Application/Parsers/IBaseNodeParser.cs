using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Parsers
{
    public interface IBaseNodeParser<TNode> where TNode : INode
    {
        ICollection<TNode> ParseNodeValues(string inputValue);
    }
}
