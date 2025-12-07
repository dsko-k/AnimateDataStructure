using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Translators
{
    public class AvlTreeTranslator : BaseTreeTranslator<AvlTree, NodeAvlTree, SaveAvlTreeDto>
    {
        public AvlTreeTranslator(AvlTreeNodeParser avlTreeNodeParser)
            :base(avlTreeNodeParser)
        {            
        }
    }
}
