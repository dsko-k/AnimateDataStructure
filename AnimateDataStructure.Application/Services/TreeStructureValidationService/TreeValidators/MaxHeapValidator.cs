using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationNodes;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationHelpers;

namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidators
{
    public class MaxHeapValidator : ITreeValidator
    {
        public ICollection<NodeMaxHeap> Nodes { get; set; }

        public MaxHeapValidator(ICollection<NodeMaxHeap> nodes)
        {
            Nodes = nodes;
        }

        public ServiceResult ValidateStructure()
        {
            if (Nodes == null || !Nodes.Any())
            {
                return ServiceResult.Success();
            }

            ValidationNodeMaxHeap[] validationArray = MaxHeapValidationHelper.PrepareValidationArray(Nodes);

            ServiceResult failureResult = ServiceResult.Success(); // Check the Max Heap Property starting from the root (index 0)

            MaxHeapValidationHelper.CheckMaxHeapProperty(validationArray, 0, ref failureResult); // The check will stop and update failureResult on the first violation

            return failureResult;
        }
    }
}
