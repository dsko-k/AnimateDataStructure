using AnimateDataStructure.Application.Results;
using AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationNodes;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationHelpers
{
    // Assumes the input is ordered in Level-Order (Breadth-First)
    public static class RedBlackTreeValidationHelper
    {
        /// <summary>
        /// Builds the tree structure by inserting nodes sequentially according to BST rules,
        /// while preserving the node's color and ID from the input.
        /// This fixes the topology issue caused by sparse input lists that omit null placeholders.
        /// </summary>
        public static ValidationNodeRedBlackTree BuildTreeFromLevelOrder(ICollection<NodeRedBlackTree> nodes)
        {
            if (nodes == null || !nodes.Any())
                return null;

            ValidationNodeRedBlackTree root = null;

            // Iterate through the flat list and insert nodes based on BST rules
            foreach (var inputNode in nodes)
            {
                // Skip NaN values if they somehow end up in the sequential list
                if (double.IsNaN(inputNode.Value)) continue;
                root = InsertNode(root, inputNode);
            }

            return root;
        }

        /// <summary>
        /// Inserts a node into the existing structure following standard BST rules, 
        /// preserving the RBT properties (IsRedNode and ID) for later validation.
        /// </summary>
        private static ValidationNodeRedBlackTree InsertNode(ValidationNodeRedBlackTree root, NodeRedBlackTree inputNode)
        {
            // FIX: Explicitly passing 'parent: null' to resolve the constructor call error.
            var newNode = new ValidationNodeRedBlackTree(
                inputNode.Value,
                inputNode.IsRedNode, // Retain the color property
                inputNode.NodeRedBlackTreeId,
                parent: null // Explicitly pass null for the optional parent parameter
            );

            if (root == null)
            {
                return newNode;
            }

            ValidationNodeRedBlackTree current = root;
            ValidationNodeRedBlackTree parent = null;

            // Traverse to find the correct insertion point
            while (current != null)
            {
                parent = current;
                if (newNode.Value < current.Value)
                {
                    current = current.Left;
                }
                else if (newNode.Value > current.Value)
                {
                    current = current.Right;
                }
                else
                {
                    // Skip duplicate values
                    return root;
                }
            }

            // Attach the new node
            newNode.Parent = parent;
            if (newNode.Value < parent.Value)
            {
                parent.Left = newNode;
            }
            else
            {
                parent.Right = newNode;
            }

            return root;
        }


        /// <summary>
        /// Performs in-order traversal on the linked ValidationNode structure for BST check.
        /// </summary>
        public static ICollection<double> GetInOrderTraversalValues(ValidationNodeRedBlackTree root)
        {
            var values = new List<double>();
            InOrderTraversal(root, values);
            return values;
        }

        private static void InOrderTraversal(ValidationNodeRedBlackTree node, List<double> values)
        {
            if (node == null) return;

            InOrderTraversal(node.Left, values);
            values.Add(node.Value);
            InOrderTraversal(node.Right, values);
        }


        /// <summary>
        /// Checks Property 5: All simple paths from a node to descendant leaves contain the same number of black nodes
        /// </summary>
        /// <returns>The height of black nodes in the subtree, or int.MinValue if a violation is found</returns>
        public static int ValidateEqualAmountOfBlackNodes(ValidationNodeRedBlackTree node, ref ServiceResult failureResult)
        {
            if (node == null) return 0;

            if (!failureResult.IsSuccess) return int.MinValue;

            int leftBlackHeight = ValidateEqualAmountOfBlackNodes(node.Left, ref failureResult);
            if (!failureResult.IsSuccess) return int.MinValue;

            int rightBlackHeight = ValidateEqualAmountOfBlackNodes(node.Right, ref failureResult);
            if (!failureResult.IsSuccess) return int.MinValue;

            if (leftBlackHeight != rightBlackHeight)
            {
                failureResult = ServiceResult.CreateFailureResult("RBT_P5_Violation", $"Property 5 Violation at node {node.Value}: Left black height ({leftBlackHeight}) does not equal Right black height ({rightBlackHeight}).");
                return int.MinValue;
            }

            return leftBlackHeight + (node.IsRedNode ? 0 : 1);
        }
    }

}

