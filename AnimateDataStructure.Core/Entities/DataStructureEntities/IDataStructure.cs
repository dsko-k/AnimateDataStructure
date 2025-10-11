using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Entities.DataStructureEntities
{
    public interface IDataStructure<TNode> where TNode : INode
    {
        Guid TempGuid { get; set; }

        DateTime CreatedAt { get; set; }

        DateTime UpdatedAt { get; set; }

        string UserId { get; set; }

        ICollection<TNode> Nodes { get; set; }
    }
}
