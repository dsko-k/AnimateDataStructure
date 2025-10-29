using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
