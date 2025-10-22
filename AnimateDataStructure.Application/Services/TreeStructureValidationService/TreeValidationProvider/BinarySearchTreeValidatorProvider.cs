using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidators;
using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationProvider
{
    public class BinarySearchTreeValidatorProvider : ITreeValidatorProvider<NodeBinarySearchTree>
    {
        public ITreeValidator GetValidator(ICollection<NodeBinarySearchTree> nodes)
        {
            return new BinarySearchTreeValidator(nodes);
        }
    }
}
