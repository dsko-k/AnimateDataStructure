using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Services.LoadingService
{
    public interface IDataLoader<TTree, TNode>
    where TTree : class, IDataStructure<TNode>, IHasUserId
    where TNode : class, INode
    {
        Task<string?> GetFullNodeDataByTempGuidAsync(Guid tempGuid, string userId);
    }
}
