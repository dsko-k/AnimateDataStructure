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
    public class RedBlackTreeValidator : ITreeValidator
    {
        public ICollection<NodeRedBlackTree> Nodes { get; set; }

        public RedBlackTreeValidator(ICollection<NodeRedBlackTree> nodes)
        {
            Nodes = nodes;
        }


        /// <summary>
        /// Validates the structure and properties of the Red-Black Tree
        /// </summary>
        public ServiceResult ValidateStructure()
        {
            if (Nodes == null || !Nodes.Any())
            {
                return ServiceResult.Success();
            }

            // 1. Reconstruct the Tree using BST insertion logic (fixes sparse input issue)
            ValidationNodeRedBlackTree root = RedBlackTreeValidationHelper.BuildTreeFromLevelOrder(Nodes);

            if (root == null)
            {
                return ServiceResult.Success();
            }

            var bstResult = ValidateBSTProperty(root);

            if (!bstResult.IsSuccess)
            {
                return bstResult;
            }

            var p2Result = ValidateRootColor(root);

            if (!p2Result.IsSuccess)
            {
                return p2Result;
            }

            var p4Result = ValidateRedNodeChildren(root);

            if (!p4Result.IsSuccess)
            {
                return p4Result;
            }

            return ValidateBlackHeightProperty(root);
        }


        /// <summary>
        /// Checks BST property: in-order traversal must be strictly increasing
        /// </summary>
        private ServiceResult ValidateBSTProperty(ValidationNodeRedBlackTree root)
        {
            var inOrderValues = RedBlackTreeValidationHelper.GetInOrderTraversalValues(root);

            double? previousValue = null;

            foreach (var currentValue in inOrderValues)
            {
                if (previousValue.HasValue && currentValue <= previousValue.Value)
                {
                    return ServiceResult.CreateFailureResult(ValidationErrorKeys.BSTViolation, currentValue.ToString());
                }

                previousValue = currentValue;
            }

            return ServiceResult.Success();
        }


        /// <summary>
        /// Checks whether root is black
        /// </summary>
        private ServiceResult ValidateRootColor(ValidationNodeRedBlackTree root)
        {
            if (root.IsRedNode)
            {
                return ServiceResult.CreateFailureResult(ValidationErrorKeys.RBTRedRootViolation, root.Value.ToString());
            }

            return ServiceResult.Success();
        }


        /// <summary>
        /// Checks whether all paths from a node to descendant leaves contain the same number of black nodes
        /// </summary>
        private ServiceResult ValidateBlackHeightProperty(ValidationNodeRedBlackTree root)
        {
            ServiceResult p5FailureResult = ServiceResult.Success();

            RedBlackTreeValidationHelper.ValidateEqualAmountOfBlackNodes(root, ref p5FailureResult);

            return p5FailureResult;
        }


        /// <summary>
        /// Checks: if a node is red, then both its children must be black
        /// </summary>
        private ServiceResult ValidateRedNodeChildren(ValidationNodeRedBlackTree node)
        {
            if (node == null)
            {
                return ServiceResult.Success();
            }

            if (node.IsRedNode)
            {
                if (node.Left != null && node.Left.IsRedNode)
                {
                    return ServiceResult.CreateFailureResult(ValidationErrorKeys.RBTRedNodeHasRedChildViolation, node.Value.ToString());
                }

                if (node.Right != null && node.Right.IsRedNode)
                {
                    return ServiceResult.CreateFailureResult(ValidationErrorKeys.RBTRedNodeHasRedChildViolation, node.Value.ToString());
                }
            }

            var leftResult = ValidateRedNodeChildren(node.Left);

            if (!leftResult.IsSuccess)
            {
                return leftResult;
            }

            var rightResult = ValidateRedNodeChildren(node.Right);

            if (!rightResult.IsSuccess)
            {
                return rightResult;
            }

            return ServiceResult.Success();
        }
    }
}

