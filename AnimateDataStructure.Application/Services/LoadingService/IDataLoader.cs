using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.Interfaces;

namespace AnimateDataStructure.Application.Services.LoadingService
{
    public interface IDataLoader<TTree, TNode>
    where TTree : class, IDataStructure<TNode>, IHasUserId
    where TNode : class, INode
    {
        Task<string?> GetFullNodeDataByTempGuidAsync(Guid tempGuid, string userId);
    }
}
