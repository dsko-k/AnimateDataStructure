namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationNodes
{
    public class ValidationNodeMinHeap
    {
        public double Value { get; set; }

        public int Index { get; set; }

        public ValidationNodeMinHeap(double value, int index)
        {
            Value = value;
            Index = index;
        }
    }
}
