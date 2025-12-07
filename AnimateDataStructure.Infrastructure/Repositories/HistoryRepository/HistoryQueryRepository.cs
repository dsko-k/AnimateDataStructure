using AnimateDataStructure.Core.DTOs.HistoryDataStructureDTOs;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace AnimateDataStructure.Infrastructure.Repositories.HistoryRepository
{
    public class HistoryQueryRepository : IHistoryQueryRepository
    {
        private readonly ApplicationDbContext context;

        public HistoryQueryRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<HistoryDataStructureDto>> GetCombinedHistoryForUserAsync(string userId)
        {
            var avlTrees = await GetAvlTreeHistory(userId).ToListAsync();
            var bst = await GetBstHistory(userId).ToListAsync();
            var maxHeap = await GetMaxHeapHistory(userId).ToListAsync();
            var minHeap = await GetMinHeapHistory(userId).ToListAsync();
            var rbt = await GetRbtHistory(userId).ToListAsync();

            // 2. Aggregate the List<DTO> results in memory using Concat()
            IEnumerable<HistoryDataStructureDto> combinedResults = avlTrees
                .Concat(bst)
                .Concat(maxHeap)
                .Concat(minHeap)
                .Concat(rbt);

            // 3. Sort the combined list in memory and return
            return combinedResults
                .OrderByDescending(h => h.UpdatedAt)
                .ToList();
        }


        private IQueryable<HistoryDataStructureDto> ProjectCommon<TDataStructure, TNode>(string userId, string typeName, Expression<Func<TNode, int>> pkSelector)
            where TDataStructure : class, IDataStructure<TNode>
            where TNode : class, INode
        {
            return context.Set<TDataStructure>()
                .Where(ds => ds.UserId == userId)
                .Select(ds => new HistoryDataStructureDto
                {
                    TempGuid = ds.TempGuid,
                    DataStructureType = typeName,
                    CreatedAt = ds.CreatedAt,
                    UpdatedAt = ds.UpdatedAt,

                    // Explicitly cast the ICollection to IQueryable to enable OrderBy
                    NodeData = string.Join(",", ds.Nodes
                                         .AsQueryable()
                                         .OrderBy(pkSelector)
                                         .Select(n => n.Value.ToString()))
                });
        }

        // 1. AVL Tree
        private IQueryable<HistoryDataStructureDto> GetAvlTreeHistory(string userId)
        {
            return ProjectCommon<AvlTree, NodeAvlTree>(
                userId, "AVL Tree", n => n.NodeAvlTreeId);
        }

        // 2. Binary Search Tree
        private IQueryable<HistoryDataStructureDto> GetBstHistory(string userId)
        {
            return ProjectCommon<BinarySearchTree, NodeBinarySearchTree>(
                userId, "Binary Search Tree", n => n.NodeBinarySearchTreeId);
        }

        // 3. Max Heap
        private IQueryable<HistoryDataStructureDto> GetMaxHeapHistory(string userId)
        {
            return ProjectCommon<MaxHeap, NodeMaxHeap>(
                userId, "Max Heap", n => n.NodeMaxHeapId);
        }

        // 4. Min Heap
        private IQueryable<HistoryDataStructureDto> GetMinHeapHistory(string userId)
        {
            return ProjectCommon<MinHeap, NodeMinHeap>(
                userId, "Min Heap", n => n.NodeMinHeapId);
        }

        // 5. Red-Black Tree (Specific Case)
        private IQueryable<HistoryDataStructureDto> GetRbtHistory(string userId)
        {
            return context.Set<RedBlackTree>()
                .Where(r => r.UserId == userId)
                .Select(r => new HistoryDataStructureDto
                {
                    TempGuid = r.TempGuid,
                    DataStructureType = "Red-Black Tree",
                    CreatedAt = r.CreatedAt,
                    UpdatedAt = r.UpdatedAt,

                    // Create the delimited string for each node inside the inner Select.
                    NodeData = string.Join(",", r.Nodes
                                         .AsQueryable()
                                         .OrderBy(n => n.NodeRedBlackTreeId)
                                         .Select(n => $"{n.Value.ToString()},{n.IsRedNode.ToString().ToLower()}"))
                });
        }
    }
}

