using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationHelpers;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationNodes;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidators
{
    public class MinHeapValidator : ITreeValidator
    {
        public ICollection<NodeMinHeap> Nodes { get; set; }

        public MinHeapValidator(ICollection<NodeMinHeap> nodes)
        {
            Nodes = nodes;
        }

        public ServiceResult ValidateStructure()
        {
            if (Nodes == null || !Nodes.Any())
            {
                return ServiceResult.Success();
            }

            ValidationNodeMinHeap[] validationArray = MinHeapValidationHelper.PrepareValidationArray(Nodes);

            ServiceResult failureResult = ServiceResult.Success(); // Check the Min Heap Property starting from the root (index 0)

            MinHeapValidationHelper.CheckMinHeapProperty(validationArray, 0, ref failureResult); // The check stops and updates failureResult upon the first violation found

            return failureResult;
        }
    }
}
