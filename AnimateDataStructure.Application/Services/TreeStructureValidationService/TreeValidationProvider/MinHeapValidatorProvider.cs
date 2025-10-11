using AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidators;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationProvider
{
    public class MinHeapValidatorProvider : ITreeValidatorProvider<NodeMinHeap>
    {
        public ITreeValidator GetValidator(ICollection<NodeMinHeap> nodes)
        {
            return new MinHeapValidator(nodes);
        }
    }
}
