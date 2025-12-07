using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidators;
using AnimateDataStructure.Core.Entities.NodeEntities;

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
