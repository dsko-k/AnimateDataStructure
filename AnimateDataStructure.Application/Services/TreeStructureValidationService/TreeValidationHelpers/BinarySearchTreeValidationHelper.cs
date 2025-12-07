using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationNodes;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationHelpers
{
    public static class BinarySearchTreeValidationHelper
    {
        /// <summary>
        /// Builds a linked tree structure by inserting nodes sequentially according to BST rules.
        /// </summary>
        /// <returns>The root of the reconstructed ValidationNode structure.</returns>
        public static ValidationNodeBinarySearchTree BuildTreeFromLevelOrder(ICollection<NodeBinarySearchTree> nodes)
        {
            if (nodes == null || !nodes.Any())
            {
                return null;
            }

            ValidationNodeBinarySearchTree root = null;

            // Iterate through the flat list and insert nodes based on BST rules
            foreach (var inputNode in nodes)
            {
                root = InsertNode(root, inputNode);
            }

            return root;
        }

        /// <summary>
        /// Inserts a node into the existing structure following standard BST rules.
        /// </summary>
        private static ValidationNodeBinarySearchTree InsertNode(ValidationNodeBinarySearchTree root, NodeBinarySearchTree inputNode)
        {
            var newNode = new ValidationNodeBinarySearchTree(inputNode.Value, inputNode.NodeBinarySearchTreeId);

            if (root == null)
            {
                return newNode;
            }

            ValidationNodeBinarySearchTree current = root;
            ValidationNodeBinarySearchTree parent = null;

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
                    return root; // Skip duplicate
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
        /// Performs in-order traversal on the linked ValidationNode structure.
        /// </summary>
        public static ICollection<double> GetInOrderTraversalValues(ValidationNodeBinarySearchTree root)
        {
            var values = new List<double>();
            InOrderTraversal(root, values);
            return values;
        }


        private static void InOrderTraversal(ValidationNodeBinarySearchTree node, List<double> values)
        {
            if (node == null) 
            {
                return; 
            }

            InOrderTraversal(node.Left, values);
            values.Add(node.Value);
            InOrderTraversal(node.Right, values);
        }
    }
}
