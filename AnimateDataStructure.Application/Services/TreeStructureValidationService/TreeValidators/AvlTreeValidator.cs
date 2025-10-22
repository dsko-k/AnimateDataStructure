using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.ValidationErrors;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationNodes;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationHelpers;

namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidators
{
    public class AvlTreeValidator : ITreeValidator
    {
        public ICollection<NodeAvlTree> Nodes { get; set; } // The flat, level-order input list

        public AvlTreeValidator(ICollection<NodeAvlTree> nodes)
        {
            Nodes = nodes;
        }

        /// <summary>
        /// Validates the structure by checking the BST property and the AVL balance property.
        /// </summary>
        public ServiceResult ValidateStructure()
        {
            if (Nodes == null || !Nodes.Any())
            {
                return ServiceResult.Success();
            }

            ValidationNodeAvlTree root = AvlTreeValidationHelper.BuildTreeFromLevelOrder(Nodes);

            if (root == null)
            {
                return ServiceResult.Success();
            }

            var bstResult = ValidateBSTProperty(root);

            if (!bstResult.IsSuccess)
            {
                return bstResult;
            }

            return ValidateAVLBalance(root);
        }

        /// <summary>
        /// Checks the BST property: in-order traversal must be strictly increasing
        /// </summary>
        private ServiceResult ValidateBSTProperty(ValidationNodeAvlTree root)
        {
            var inOrderValues = AvlTreeValidationHelper.GetInOrderTraversalValues(root);
            double? previousValue = null;

            foreach (var currentValue in inOrderValues)
            {
                // The BST property requires strictly increasing values (currentValue > previousValue).
                if (previousValue.HasValue && currentValue <= previousValue.Value)
                {
                    return ServiceResult.CreateFailureResult(ValidationErrorKeys.BSTViolation, currentValue.ToString());
                }

                previousValue = currentValue;
            }
            return ServiceResult.Success();
        }

        /// <summary>
        /// Checks the AVL Balance property by calculating the height and balance factor of every node
        /// </summary>
        private ServiceResult ValidateAVLBalance(ValidationNodeAvlTree root)
        {
            var result = CalculateHeightAndCheckBalance(root);

            if (!result.ValidationResult.IsSuccess)
            {
                return result.ValidationResult;
            }

            return ServiceResult.Success();
        }

        /// <summary>
        /// Recursively calculates the height of the subtree and checks the AVL balance factor.
        /// </summary>
        private HeightValidationResult CalculateHeightAndCheckBalance(ValidationNodeAvlTree node)
        {
            if (node == null)
            {
                return new HeightValidationResult(-1, ServiceResult.Success()); // Height of a null node is -1. Validation is successful.
            }

            var leftResult = CalculateHeightAndCheckBalance(node.Left);

            if (!leftResult.ValidationResult.IsSuccess)
            {
                return leftResult; // Propagate failure immediately without further calculation
            }

            var rightResult = CalculateHeightAndCheckBalance(node.Right);

            if (!rightResult.ValidationResult.IsSuccess)
            {
                return rightResult;
            }

            // Check Balance Factor
            int balanceFactor = leftResult.Height - rightResult.Height;

            if (balanceFactor > 1 || balanceFactor < -1)
            {
                var failure = ServiceResult.CreateFailureResult(ValidationErrorKeys.AVLBalanceViolation, node.Value.ToString());

                return new HeightValidationResult(0, failure);
            }
                        
            int currentHeight = 1 + Math.Max(leftResult.Height, rightResult.Height);

            return new HeightValidationResult(currentHeight, ServiceResult.Success()); // Success: return calculated new height
        }
    }
}
