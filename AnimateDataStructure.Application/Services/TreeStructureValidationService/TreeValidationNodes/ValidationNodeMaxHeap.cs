using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationNodes
{
    public class ValidationNodeMaxHeap
    {
        public double Value { get; set; }

        // The index in the underlying array/list is crucial for heap validation
        public int Index { get; set; }

        public ValidationNodeMaxHeap(double value, int index)
        {
            Value = value;
            Index = index;
        }
    }
}
