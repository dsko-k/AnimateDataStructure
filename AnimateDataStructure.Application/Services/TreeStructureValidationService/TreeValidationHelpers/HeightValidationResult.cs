using AnimateDataStructure.Core.Results;

namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationHelpers
{
    public struct HeightValidationResult
    {
        public int Height { get; }

        public ServiceResult ValidationResult { get; }

        public HeightValidationResult(int height, ServiceResult result)
        {
            Height = height;
            ValidationResult = result;
        }
    }
}
