using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidators;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationProvider
{
    public class MaxHeapValidatorProvider : ITreeValidatorProvider<NodeMaxHeap>
    {
        public ITreeValidator GetValidator(ICollection<NodeMaxHeap> nodes)
        {
            return new MaxHeapValidator(nodes);
        }
    }
}
