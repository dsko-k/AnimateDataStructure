using AnimateDataStructure.Application.Results;
using AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationHelpers;
using AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationNodes;
using AnimateDataStructure.Application.ValidationErrors;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidators
{
    public class BinarySearchTreeValidator : ITreeValidator
    {
        public ICollection<NodeBinarySearchTree> Nodes { get; set; }

        public BinarySearchTreeValidator(ICollection<NodeBinarySearchTree> nodes)
        {
            Nodes = nodes;
        }

        public ServiceResult ValidateStructure()
        {
            if (Nodes == null || !Nodes.Any())
            {
                return ServiceResult.Success();
            }

            ValidationNodeBinarySearchTree root = BinarySearchTreeValidationHelper.BuildTreeFromLevelOrder(Nodes);

            var inOrderValues = BinarySearchTreeValidationHelper.GetInOrderTraversalValues(root);

            return ValidateInOrderSequence(inOrderValues);
        }

        /// <summary>
        /// check whether values are strictly increasing (BST property)
        /// </summary>
        private ServiceResult ValidateInOrderSequence(ICollection<double> values)
        {
            double? previousValue = null;

            foreach (var currentValue in values)
            {
                if (previousValue.HasValue && currentValue < previousValue.Value)
                {
                    return ServiceResult.CreateFailureResult(ValidationErrorKeys.BSTViolation, currentValue.ToString());
                }

                previousValue = currentValue;
            }

            return ServiceResult.Success();
        }
    }
}
