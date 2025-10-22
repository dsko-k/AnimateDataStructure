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
    public class MinHeapTranslator : BaseTreeTranslator<MinHeap, NodeMinHeap, SaveMinHeapDto>
    {
        public MinHeapTranslator(MinHeapNodeParser minHeapNodeParser)
            :base(minHeapNodeParser)
        {
        }
    }
}
