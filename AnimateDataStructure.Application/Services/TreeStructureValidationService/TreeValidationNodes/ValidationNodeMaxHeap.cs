namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationNodes
{
    public class ValidationNodeMaxHeap
    {
        public double Value { get; set; }

        public int Index { get; set; }

        public ValidationNodeMaxHeap(double value, int index)
        {
            Value = value;
            Index = index;
        }
    }
}
