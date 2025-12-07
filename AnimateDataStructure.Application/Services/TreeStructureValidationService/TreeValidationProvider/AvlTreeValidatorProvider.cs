using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidators;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationProvider
{
    public class AvlTreeValidatorProvider : ITreeValidatorProvider<NodeAvlTree>
    {
        public ITreeValidator GetValidator(ICollection<NodeAvlTree> nodes)
        {
            return new AvlTreeValidator(nodes);
        }
    }
}
