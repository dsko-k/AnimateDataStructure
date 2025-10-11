using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationNodes
{
    public class ValidationNodeMinHeap
    {
        public double Value { get; set; }

        // The index in the underlying array/list is crucial for heap validation
        public int Index { get; set; }

        public ValidationNodeMinHeap(double value, int index)
        {
            Value = value;
            Index = index;
        }
    }
}
