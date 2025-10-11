using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.DTOs.SaveNodesDTOs
{
    public abstract class AbstractSaveTreeDto
    {
        public string InputValue { get; set; }

        public string TempGuid { get; set; }
    }
}
