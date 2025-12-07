using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Parsers
{
    public interface INodeValueParser
    {
        ICollection<INode> ParseNodeValues(string inputValue);
    }
}
