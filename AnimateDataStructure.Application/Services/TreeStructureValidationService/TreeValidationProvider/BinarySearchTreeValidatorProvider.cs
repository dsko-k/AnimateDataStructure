using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidators;
using AnimateDataStructure.Core.Entities.NodeEntities;

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
