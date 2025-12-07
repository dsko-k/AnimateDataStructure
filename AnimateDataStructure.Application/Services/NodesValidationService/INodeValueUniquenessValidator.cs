using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Services.NodesValidationService
{
    public interface INodeValueUniquenessValidator
    {
        ServiceResult ValidateNodesUniqueness<TDto, TNode>(TDto dto, IBaseNodeParser<TNode> parser)
        where TDto : AbstractSaveTreeDto
        where TNode : INode;
    }
}
