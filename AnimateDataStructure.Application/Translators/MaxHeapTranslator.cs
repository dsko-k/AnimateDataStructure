using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Translators
{
    //public class MaxHeapTranslator : ITranslatorSaveTree<MaxHeap, SaveMaxHeapDto, NodeMaxHeap>
    //{
    //    private readonly MaxHeapNodeParser parser = new();

    //    public MaxHeap CreateTreeFromDto(SaveMaxHeapDto dto, string userId)
    //    {
    //        var maxHeap = new MaxHeap
    //        {
    //            TempGuid = Guid.Parse(dto.TempGuid),
    //            UserId = userId,
    //            CreatedAt = DateTime.UtcNow,
    //            UpdatedAt = DateTime.UtcNow
    //        };

    //        var nodes = parser.ParseNodeValues(dto.InputValue);

    //        foreach (var node in nodes)
    //        {
    //            maxHeap.Nodes.Add(node);
    //        }

    //        return maxHeap;
    //    }

    //    public void UpdateTreeFromDto(SaveMaxHeapDto dto, MaxHeap existingTree)
    //    {
    //        existingTree.UpdatedAt = DateTime.UtcNow;
    //        existingTree.Nodes.Clear(); // Clear existing nodes

    //        var nodes = parser.ParseNodeValues(dto.InputValue);

    //        foreach (var node in nodes)
    //        {
    //            existingTree.Nodes.Add(node);
    //        }
    //    }
    //}

    public class MaxHeapTranslator : BaseTreeTranslator<MaxHeap, NodeMaxHeap, SaveMaxHeapDto>
    {
        public MaxHeapTranslator(MaxHeapNodeParser maxHeapNodeParser)
            :base(maxHeapNodeParser)
        {
        }
    }
}
