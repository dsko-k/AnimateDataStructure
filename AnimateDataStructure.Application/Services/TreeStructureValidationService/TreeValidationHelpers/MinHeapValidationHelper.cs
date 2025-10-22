using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationNodes;
using AnimateDataStructure.Core.ValidationErrors;
using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationHelpers
{
    public static class MinHeapValidationHelper
    {
        /// <summary>
        /// Converts the flat input list into an array of ValidationNodeMinHeap objects.
        /// </summary>
        public static ValidationNodeMinHeap[] PrepareValidationArray(ICollection<NodeMinHeap> nodes)
        {
            if (nodes == null || !nodes.Any()) return new ValidationNodeMinHeap[0];

            // Convert the input to an array of validation nodes, maintaining their indices.
            return nodes.Select((n, index) => new ValidationNodeMinHeap(n.Value, index)).ToArray();
        }

        /// <summary>
        /// Recursively checks the Min Heap property: Parent value <= Child value.
        /// </summary>
        /// <param name="nodesArray">The array of validation nodes.</param>
        /// <param name="parentIndex">The index of the current parent node being checked.</param>
        /// <param name="failureResult">ServiceResult to update upon first violation.</param>
        /// <returns>True if the subtree rooted at parentIndex is a valid Min Heap, False otherwise.</returns>
        public static bool CheckMinHeapProperty(ValidationNodeMinHeap[] nodesArray, int parentIndex, ref ServiceResult failureResult)
        {
            if (parentIndex >= nodesArray.Length)
            {
                return true; // Base case: An empty subtree is valid.
            }

            // Parent node
            var parentNode = nodesArray[parentIndex];

            // Calculate child indices (0-indexed array)
            int leftChildIndex = 2 * parentIndex + 1;
            int rightChildIndex = 2 * parentIndex + 2;

            // --- Check Left Child ---
            if (leftChildIndex < nodesArray.Length)
            {
                var leftChild = nodesArray[leftChildIndex];

                // Min Heap Property Check: Parent must be <= Child
                if (parentNode.Value > leftChild.Value)
                {
                    //failureResult = ServiceResult.CreateFailureResult("MinHeapViolation",
                    //    $"Min Heap Property Violation: Parent node value ({parentNode.Value}) at index {parentNode.Index} is greater than its left child ({leftChild.Value}) at index {leftChild.Index}.");

                    failureResult = ServiceResult.CreateFailureResult(ValidationErrorKeys.MinHeapViolation, parentNode.Value.ToString());

                    return false;
                }

                // Recurse down the left branch
                if (!CheckMinHeapProperty(nodesArray, leftChildIndex, ref failureResult))
                {
                    return false;
                }
            }

            // --- Check Right Child ---
            if (rightChildIndex < nodesArray.Length)
            {
                var rightChild = nodesArray[rightChildIndex];

                // Min Heap Property Check: Parent must be <= Child
                if (parentNode.Value > rightChild.Value)
                {
                    //failureResult = ServiceResult.CreateFailureResult("MinHeapViolation",
                    //    $"Min Heap Property Violation: Parent node value ({parentNode.Value}) at index {parentNode.Index} is greater than its right child ({rightChild.Value}) at index {rightChild.Index}.");

                    failureResult = ServiceResult.CreateFailureResult(ValidationErrorKeys.MinHeapViolation, parentNode.Value.ToString());

                    return false;
                }

                // Recurse down the right branch
                if (!CheckMinHeapProperty(nodesArray, rightChildIndex, ref failureResult))
                {
                    return false;
                }
            }

            return true;
        }
    }
}
