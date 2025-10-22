using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Parsers
{
    public interface INodeValueParser
    {
        ICollection<INode> ParseNodeValues(string inputValue);
    }
}
