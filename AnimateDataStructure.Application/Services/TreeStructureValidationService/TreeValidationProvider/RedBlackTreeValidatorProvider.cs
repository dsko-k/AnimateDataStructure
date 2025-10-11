using AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidators;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationProvider
{
    public class RedBlackTreeValidatorProvider : ITreeValidatorProvider<NodeRedBlackTree>
    {
        public ITreeValidator GetValidator(ICollection<NodeRedBlackTree> nodes)
        {
            return new RedBlackTreeValidator(nodes);
        }
    }
}
