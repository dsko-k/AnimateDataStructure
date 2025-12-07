using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Application.Services.NodesFormattingService
{
    public interface IDataStructureFormatter<TNode> where TNode : INode
    {
        string FormatNodes(IEnumerable<TNode> orderedNodes);
    }
}
