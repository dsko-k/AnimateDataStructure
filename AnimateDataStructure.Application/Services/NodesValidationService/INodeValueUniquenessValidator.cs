using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Services.NodesValidationService
{
    public interface INodeValueUniquenessValidator
    {
        ServiceResult ValidateNodesUniqueness<TDto, TNode>(TDto dto, IBaseNodeParser<TNode> parser)
        where TDto : AbstractSaveTreeDto
        where TNode : INode;
    }
}
