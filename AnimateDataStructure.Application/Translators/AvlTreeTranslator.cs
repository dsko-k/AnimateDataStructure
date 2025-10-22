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
    //public class AvlTreeTranslator : ITranslatorSaveTree<AvlTree, SaveAvlTreeDto, NodeAvlTree>
    //{
    //    private readonly AvlTreeNodeParser parser = new();

    //    public AvlTree CreateTreeFromDto(SaveAvlTreeDto dto, string userId)
    //    {
    //        var avlTree = new AvlTree
    //        {
    //            TempGuid = Guid.Parse(dto.TempGuid),
    //            UserId = userId,
    //            CreatedAt = DateTime.UtcNow,
    //            UpdatedAt = DateTime.UtcNow
    //        };

    //        var nodes = parser.ParseNodeValues(dto.InputValue);

    //        foreach (var node in nodes)
    //        {
    //            avlTree.Nodes.Add(node);
    //        }

    //        return avlTree;
    //    }

    //    public void UpdateTreeFromDto(SaveAvlTreeDto dto, AvlTree existingTree)
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


    public class AvlTreeTranslator : BaseTreeTranslator<AvlTree, NodeAvlTree, SaveAvlTreeDto>
    {
        public AvlTreeTranslator(AvlTreeNodeParser avlTreeNodeParser)
            :base(avlTreeNodeParser)
        {            
        }
    }
}
