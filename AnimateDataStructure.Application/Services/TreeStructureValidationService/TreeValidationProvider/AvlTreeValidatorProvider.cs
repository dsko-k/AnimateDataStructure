using AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidators;
using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationProvider
{
    public class AvlTreeValidatorProvider : ITreeValidatorProvider<NodeAvlTree>
    {
        public ITreeValidator GetValidator(ICollection<NodeAvlTree> nodes)
        {
            // Instantiates the validator with the runtime data
            return new AvlTreeValidator(nodes);
        }
    }
}
