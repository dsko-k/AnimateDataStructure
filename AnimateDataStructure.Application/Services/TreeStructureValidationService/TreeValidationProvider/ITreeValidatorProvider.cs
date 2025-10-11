using AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidators;
using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationProvider
{
    public interface ITreeValidatorProvider<TNode> where TNode : class, INode, new()
    {
        ITreeValidator GetValidator(ICollection<TNode> nodes);
    }
}
