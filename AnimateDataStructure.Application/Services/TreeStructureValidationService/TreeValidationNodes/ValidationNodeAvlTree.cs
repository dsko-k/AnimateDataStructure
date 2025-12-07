namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationNodes
{
    public class ValidationNodeAvlTree
    {
        public double Value { get; set; }

        public ValidationNodeAvlTree? Left { get; set; }

        public ValidationNodeAvlTree? Right { get; set; }

        public ValidationNodeAvlTree? Parent { get; set; }

        public int OriginalNodeId { get; set; }


        public ValidationNodeAvlTree(double value, int originalId, ValidationNodeAvlTree? parent = null)
        {
            Value = value;
            OriginalNodeId = originalId;
            Parent = parent;
        }
    }
}
