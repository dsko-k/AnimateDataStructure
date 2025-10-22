using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationHelpers;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationNodes;
using AnimateDataStructure.Core.ValidationErrors;
using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            // 1. Prepare the array for index-based validation
            ValidationNodeMinHeap[] validationArray = MinHeapValidationHelper.PrepareValidationArray(Nodes);

            // Assumption: The input list represents a complete binary tree structure.
            // We only need to check the Min Heap Property.

            // 2. Check the Min Heap Property starting from the root (index 0)
            ServiceResult failureResult = ServiceResult.Success();

            // The check stops and updates failureResult upon the first violation found.
            MinHeapValidationHelper.CheckMinHeapProperty(validationArray, 0, ref failureResult);

            return failureResult;
        }
    }
}
