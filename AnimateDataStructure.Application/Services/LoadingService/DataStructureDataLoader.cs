using AnimateDataStructure.Application.Services.NodesFormattingService;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.Interfaces;
using AnimateDataStructure.Infrastructure.Repositories.GenericRepository;
using System.Linq.Expressions;

namespace AnimateDataStructure.Application.Services.LoadingService
{
    public class DataStructureDataLoader<TTree, TNode> : IDataLoader<TTree, TNode>
    where TTree : class, IDataStructure<TNode>, IHasUserId, new()
    where TNode : class, INode, IHasPrimaryKeyId, new()
    {
        private readonly IGenericRepository<TTree> repository;
        private readonly IDataStructureFormatter<TNode> formatter;

        public DataStructureDataLoader(IGenericRepository<TTree> repository, IDataStructureFormatter<TNode> formatter)
        {
            this.repository = repository;
            this.formatter = formatter;
        }


        public async Task<string?> GetFullNodeDataByTempGuidAsync(Guid tempGuid, string userId)
        {
            var treeEntity = await repository.GetByTempGuidAsync(tempGuid, t => t.Nodes);

            if (treeEntity == null || ((IHasUserId)treeEntity).UserId != userId)
            {
                return null;
            }

            return GetFormattedNodeData(treeEntity);
        }


        private string GetFormattedNodeData(TTree tree)
        {
            var orderedNodes = tree.Nodes.AsQueryable()
                .OrderBy(GetPrimaryKeySelector())
                .ToList();

            return formatter.FormatNodes(orderedNodes);
        }


        protected Expression<Func<TNode, int>> GetPrimaryKeySelector()
        {
            return n => ((IHasPrimaryKeyId)n).PrimaryKeyId;
        }
    }
}
