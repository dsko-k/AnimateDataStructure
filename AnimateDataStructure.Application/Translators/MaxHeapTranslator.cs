using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Translators
{
    public class MaxHeapTranslator : BaseTreeTranslator<MaxHeap, NodeMaxHeap, SaveMaxHeapDto>
    {
        public MaxHeapTranslator(MaxHeapNodeParser maxHeapNodeParser)
            :base(maxHeapNodeParser)
        {
        }
    }
}
