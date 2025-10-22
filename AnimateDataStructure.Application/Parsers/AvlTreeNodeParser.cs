using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Parsers
{
    public class AvlTreeNodeParser : BaseNodeParser<NodeAvlTree>
    {
        protected override NodeAvlTree CreateNode(double value)
        {
            return new NodeAvlTree { Value = value };
        }
    }
}
