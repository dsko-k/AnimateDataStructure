using AnimateDataStructure.Application.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Application.Parsers;
using AnimateDataStructure.Application.Results;
using AnimateDataStructure.Application.Services.NodesValidationService;
using AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationProvider;
using AnimateDataStructure.Application.Translators;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Infrastructure.Repositories;

namespace AnimateDataStructure.Application.Services.TreeServices
{
    public class AvlTreeService : BaseTreeService<AvlTree, SaveAvlTreeDto, NodeAvlTree>
    {
        public AvlTreeService(IGenericRepository<AvlTree> avlTreeRepository,
                              IBaseTreeTranslator<AvlTree, SaveAvlTreeDto, NodeAvlTree> translator,
                              INodeValueUniquenessValidator uniquenessValidator,
                              IBaseNodeParser<NodeAvlTree> parser,
                              ITreeValidatorProvider<NodeAvlTree> treeValidatorProvider)
                              : base(avlTreeRepository, translator, uniquenessValidator, parser, treeValidatorProvider)
        {
        }
    }
}
