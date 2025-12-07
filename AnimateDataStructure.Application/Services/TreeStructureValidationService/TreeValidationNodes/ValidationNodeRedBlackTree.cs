namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationNodes
{
    public class ValidationNodeRedBlackTree
    {
        public double Value { get; set; }

        public bool IsRedNode { get; set; }
                
        public ValidationNodeRedBlackTree? Parent { get; set; }

        public ValidationNodeRedBlackTree? Left { get; set; }

        public ValidationNodeRedBlackTree? Right { get; set; }
        
        public int OriginalNodeId { get; set; }

        public ValidationNodeRedBlackTree(double value, bool isRed, int originalId, ValidationNodeRedBlackTree parent)
        {
            Value = value;
            IsRedNode = isRed;
            OriginalNodeId = originalId;
            Parent = parent;
        }
    }
}
