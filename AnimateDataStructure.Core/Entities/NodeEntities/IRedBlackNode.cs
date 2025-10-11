using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Entities.NodeEntities
{
    public interface IRedBlackNode : INode
    {
        bool IsRedNode { get; set; }
    }
}
