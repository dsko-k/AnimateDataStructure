using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Translators
{
    public class MinHeapTranslator : BaseTreeTranslator<MinHeap, NodeMinHeap, SaveMinHeapDto>
    {
        public MinHeapTranslator(MinHeapNodeParser minHeapNodeParser)
            :base(minHeapNodeParser)
        {
        }
    }
}
