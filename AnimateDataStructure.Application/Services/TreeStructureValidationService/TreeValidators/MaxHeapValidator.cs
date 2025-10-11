using AnimateDataStructure.Application.Results;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Application.ValidationErrors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationNodes;
using AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationHelpers;

namespace AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidators
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

            // 1. Prepare the array for index-based validation
            ValidationNodeMaxHeap[] validationArray = MaxHeapValidationHelper.PrepareValidationArray(Nodes);

            // 2. Check the Max Heap Property starting from the root (index 0)
            ServiceResult failureResult = ServiceResult.Success();

            // The check will stop and update failureResult on the first violation.
            MaxHeapValidationHelper.CheckMaxHeapProperty(validationArray, 0, ref failureResult);

            return failureResult;
        }
    }
}
