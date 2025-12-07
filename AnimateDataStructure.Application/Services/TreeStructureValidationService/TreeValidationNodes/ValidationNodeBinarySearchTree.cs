namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationNodes
{
    public class ValidationNodeBinarySearchTree
    {
        public double Value { get; set; }

        public ValidationNodeBinarySearchTree? Left { get; set; }

        public ValidationNodeBinarySearchTree? Right { get; set; }

        public ValidationNodeBinarySearchTree? Parent { get; set; }

        public int OriginalNodeId { get; set; }


        public ValidationNodeBinarySearchTree(double value, int originalId, ValidationNodeBinarySearchTree? parent = null)
        {
            Value = value;
            OriginalNodeId = originalId;
            Parent = parent;
        }
    }
}
