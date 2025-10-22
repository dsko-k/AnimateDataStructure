using AnimateDataStructure.Core.DTOs.HistoryDataStructureDTOs;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Xml.Linq;
using System.Linq.Expressions;

namespace AnimateDataStructure.Infrastructure.Repositories.HistoryRepository
{
    public class HistoryQueryRepository : IHistoryQueryRepository
    {
        private readonly ApplicationDbContext _context;

        public HistoryQueryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<HistoryDataStructureDto>> GetCombinedHistoryForUserAsync(string userId)
        {
            var avlTrees = await GetAvlTreeHistory(userId).ToListAsync();
            var bst = await GetBstHistory(userId).ToListAsync();
            var maxHeap = await GetMaxHeapHistory(userId).ToListAsync();
            var minHeap = await GetMinHeapHistory(userId).ToListAsync();
            var rbt = await GetRbtHistory(userId).ToListAsync();

            // 2. Aggregate the List<DTO> results in memory using Concat() 
            //    (Since they are Lists, this uses System.Linq.Enumerable.Concat)
            IEnumerable<HistoryDataStructureDto> combinedResults = avlTrees
                .Concat(bst)
                .Concat(maxHeap)
                .Concat(minHeap)
                .Concat(rbt);

            // 3. Sort the combined list in memory and return.
            //    We use Task.FromResult since the list is already in memory.
            return combinedResults
                .OrderByDescending(h => h.UpdatedAt)
                .ToList(); // ToList() is redundant here but safe.
        }

        // ---------------------------------------------------------------------
        // ⭐️ PRIVATE PROJECTION METHODS (Fixed LINQ Translation) ⭐️
        // ---------------------------------------------------------------------

        private IQueryable<HistoryDataStructureDto> ProjectCommon<TDataStructure, TNode>(string userId, string typeName, Expression<Func<TNode, int>> pkSelector)
            where TDataStructure : class, IDataStructure<TNode>
            where TNode : class, INode
        {
            return _context.Set<TDataStructure>()
                .Where(ds => ds.UserId == userId)
                .Select(ds => new HistoryDataStructureDto
                {
                    TempGuid = ds.TempGuid,
                    DataStructureType = typeName,
                    CreatedAt = ds.CreatedAt,
                    UpdatedAt = ds.UpdatedAt,

                    // ⭐️ FIX: Explicitly cast the ICollection to IQueryable to enable OrderBy
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
            return _context.Set<RedBlackTree>()
                .Where(r => r.UserId == userId)
                .Select(r => new HistoryDataStructureDto
                {
                    TempGuid = r.TempGuid,
                    DataStructureType = "Red-Black Tree",
                    CreatedAt = r.CreatedAt,
                    UpdatedAt = r.UpdatedAt,

                    // ⭐️ FIX: Simplify the projection. Create the delimited string 
                    // for EACH node inside the inner Select. EF Core translates this better.
                    NodeData = string.Join(",", r.Nodes
                                         .AsQueryable() // Keep AsQueryable for compilation if needed
                                         .OrderBy(n => n.NodeRedBlackTreeId)
                                         .Select(n => $"{n.Value.ToString()},{n.IsRedNode.ToString().ToLower()}"))
                });
        }
    }
}

