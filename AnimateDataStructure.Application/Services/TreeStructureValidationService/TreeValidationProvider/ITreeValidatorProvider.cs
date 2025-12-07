using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidators;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationProvider
{
    public interface ITreeValidatorProvider<TNode> where TNode : class, INode, new()
    {
        ITreeValidator GetValidator(ICollection<TNode> nodes);
    }
}
