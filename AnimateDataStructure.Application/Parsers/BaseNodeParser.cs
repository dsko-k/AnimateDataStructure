using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Parsers
{
    public abstract class BaseNodeParser<TNode> : INodeValueParser, IBaseNodeParser<TNode> where TNode : INode
    {
        public ICollection<TNode> ParseNodeValues(string inputValue)
        {
            var nodes = new List<TNode>();
            var values = inputValue.Split(',', StringSplitOptions.RemoveEmptyEntries);

            foreach (var valueString in values)
            {
                // Use InvariantCulture to explicitly set the dot (.) as the decimal separator
                if (double.TryParse(valueString, CultureInfo.InvariantCulture, out double value))
                {
                    nodes.Add(CreateNode(value));
                }
            }
            return nodes;
        }

        protected abstract TNode CreateNode(double value);


        ICollection<INode> INodeValueParser.ParseNodeValues(string inputValue)
        {
            return ParseNodeValues(inputValue)
                   .Select(n => (INode)n)
                   .ToList();
        }
    }
}
