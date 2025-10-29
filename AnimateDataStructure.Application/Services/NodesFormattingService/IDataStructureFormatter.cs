using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Services.NodesFormattingService
{
    public interface IDataStructureFormatter<TNode> where TNode : INode
    {
        string FormatNodes(IEnumerable<TNode> orderedNodes);
    }
}
