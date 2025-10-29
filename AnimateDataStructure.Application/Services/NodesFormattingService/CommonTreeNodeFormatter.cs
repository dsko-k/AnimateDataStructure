using AnimateDataStructure.Core.Entities.NodeEntities;
using System.Globalization;

namespace AnimateDataStructure.Application.Services.NodesFormattingService
{
    /// <summary>
    /// Generic implementation of node formatter for all other INode types
    /// </summary>
    public class CommonTreeNodeFormatter<TNode> : IDataStructureFormatter<TNode>
        where TNode : class, INode
    {
        public string FormatNodes(IEnumerable<TNode> orderedNodes)
        {
            return string.Join(",", orderedNodes.Select(n => n.Value.ToString(CultureInfo.InvariantCulture)));
        }
    }
}
