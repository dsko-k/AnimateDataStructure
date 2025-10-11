using AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationNodes;
using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationHelpers
{
    // NOTE: This helper assumes that the input ICollection<NodeAvlTree> Nodes is ordered in Level-Order (Breadth-First).
    public static class AvlTreeValidationHelper
    {
        /// <summary>
        /// Builds the tree structure by inserting nodes sequentially according to BST rules.
        /// FIX: Replaces level-order indexing (which is incompatible with sparse trees from a non-placeholder list)
        /// with BST insertion logic to correctly define the topology based on values.
        /// </summary>
        public static ValidationNodeAvlTree BuildTreeFromLevelOrder(ICollection<NodeAvlTree> nodes)
        {
            if (nodes == null || !nodes.Any())
            {
                return null;
            }

            ValidationNodeAvlTree root = null;

            foreach (var inputNode in nodes) // Iterate through the flat list of nodes
            {
                root = InsertNode(root, inputNode); // Use BST insertion rules
            }

            return root;
        }

        /// <summary>
        /// Inserts a node into the existing structure following standard BST rules
        /// </summary>
        private static ValidationNodeAvlTree InsertNode(ValidationNodeAvlTree root, NodeAvlTree inputNode)
        {
            var newNode = new ValidationNodeAvlTree(inputNode.Value, inputNode.NodeAvlTreeId, parent: null); // Parent will be set during insertion

            if (root == null)
            {
                return newNode;
            }

            ValidationNodeAvlTree current = root;
            ValidationNodeAvlTree parent = null;

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
                    return root; // Skip duplicates
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
        /// Performs in-order traversal on the reconstructed tree to get values for the BST property check.
        /// </summary>
        public static ICollection<double> GetInOrderTraversalValues(ValidationNodeAvlTree root)
        {
            var values = new List<double>();
            InOrderTraversal(root, values);
            return values;
        }


        // Recursive method to perform standard In-Order Traversal
        private static void InOrderTraversal(ValidationNodeAvlTree node, List<double> values)
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
