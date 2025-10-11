using AnimateDataStructure.Application.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Application.Parsers;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Translators
{
    public class MinHeapTranslator : BaseTreeTranslator<MinHeap, NodeMinHeap, SaveMinHeapDto>
    {
        public MinHeapTranslator(MinHeapNodeParser minHeapNodeParser)
            :base(minHeapNodeParser)
        {
        }
    }
}
