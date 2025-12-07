using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Translators
{
    public class BinarySearchTreeTranslator : BaseTreeTranslator<BinarySearchTree, NodeBinarySearchTree, SaveBinarySearchTreeDto>
    {
        public BinarySearchTreeTranslator(BinarySearchTreeParser binarySearchTreeParser)
            : base(binarySearchTreeParser)
        {
        }
    }
}
