using AnimateDataStructure.Core.Entities.NodeEntities;
using System.Globalization;

namespace AnimateDataStructure.Application.Services.NodesFormattingService
{
    public class RedBlackTreeFormatter : IDataStructureFormatter<NodeRedBlackTree>
    {
        public string FormatNodes(IEnumerable<NodeRedBlackTree> orderedNodes)
        {
            return string.Join(",", orderedNodes
                .Select(node =>
                {
                    return $"{node.Value.ToString(CultureInfo.InvariantCulture)},{node.IsRedNode.ToString().ToLower()}";
                }));
        }
    }
}
