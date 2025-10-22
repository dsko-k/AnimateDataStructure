using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.DTOs.SaveNodesDTOs
{
    public class SaveBinarySearchTreeDto : AbstractSaveTreeDto, IHasAuthenticatedProperty
    {
        public bool IsAuthenticated { get; set; }
    }
}
