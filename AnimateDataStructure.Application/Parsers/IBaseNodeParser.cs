using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Application.Parsers
{
    public interface IBaseNodeParser<TNode> where TNode : INode
    {
        ICollection<TNode> ParseNodeValues(string inputValue);
    }
}
