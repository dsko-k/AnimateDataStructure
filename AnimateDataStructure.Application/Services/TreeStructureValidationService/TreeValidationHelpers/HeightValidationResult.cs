using AnimateDataStructure.Application.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationHelpers
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
