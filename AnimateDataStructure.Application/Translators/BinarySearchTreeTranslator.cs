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
    //public class BinarySearchTreeTranslator : ITranslatorSaveTree<BinarySearchTree, SaveBinarySearchTreeDto, NodeBinarySearchTree>
    //{
    //    private readonly BinarySearchTreeParser parser = new();

    //    public BinarySearchTree CreateTreeFromDto(SaveBinarySearchTreeDto dto, string userId)
    //    {
    //        var binarySearchTree = new BinarySearchTree
    //        {
    //            TempGuid = Guid.Parse(dto.TempGuid),
    //            UserId = userId,
    //            CreatedAt = DateTime.UtcNow,
    //            UpdatedAt = DateTime.UtcNow
    //        };

    //        var nodes = parser.ParseNodeValues(dto.InputValue);

    //        foreach (var node in nodes)
    //        {
    //            binarySearchTree.Nodes.Add(node);
    //        }

    //        return binarySearchTree;
    //    }


    //    public void UpdateTreeFromDto(SaveBinarySearchTreeDto dto, BinarySearchTree existingTree)
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



    public class BinarySearchTreeTranslator : BaseTreeTranslator<BinarySearchTree, NodeBinarySearchTree, SaveBinarySearchTreeDto>
    {
        public BinarySearchTreeTranslator(BinarySearchTreeParser binarySearchTreeParser)
            : base(binarySearchTreeParser)
        {
        }
    }
}
