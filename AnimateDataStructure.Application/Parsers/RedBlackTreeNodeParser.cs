using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace AnimateDataStructure.Core.Parsers
{
    public class RedBlackTreeNodeParser : IBaseNodeParser<NodeRedBlackTree>
    {
        public ICollection<NodeRedBlackTree> ParseNodeValues(string inputValue)
        {
            var nodes = new List<NodeRedBlackTree>();
            var values = inputValue.Split(',', StringSplitOptions.RemoveEmptyEntries);

            for (int i = 0; i < values.Length; i += 2)
            {
                // Use InvariantCulture to explicitly set the dot (.) as the decimal separator
                if (double.TryParse(values[i], CultureInfo.InvariantCulture, out double value) &&
                    bool.TryParse(values[i + 1], out bool isRed))
                {
                    nodes.Add(CreateNode(value, isRed));
                }
            }

            return nodes;
        }


        private NodeRedBlackTree CreateNode(double value, bool isRedNode)
        {
            return new NodeRedBlackTree { Value = value, IsRedNode = isRedNode };
        }
    }
}
