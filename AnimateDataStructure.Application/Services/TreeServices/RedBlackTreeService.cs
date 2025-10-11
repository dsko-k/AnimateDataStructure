using AnimateDataStructure.Application.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Application.Parsers;
using AnimateDataStructure.Application.Results;
using AnimateDataStructure.Application.Services.NodesValidationService;
using AnimateDataStructure.Application.Services.TreeStructureValidationService.TreeValidationProvider;
using AnimateDataStructure.Application.Translators;
using AnimateDataStructure.Application.ValidationErrors;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Infrastructure.Repositories;

namespace AnimateDataStructure.Application.Services.TreeServices
{
    public class RedBlackTreeService : BaseTreeService<RedBlackTree, SaveRedBlackTreeDto, NodeRedBlackTree>
    {        
        public RedBlackTreeService(IGenericRepository<RedBlackTree> repository,
                                   IBaseTreeTranslator<RedBlackTree, SaveRedBlackTreeDto, NodeRedBlackTree> translator,
                                   INodeValueUniquenessValidator uniquenessValidator,        
                                   IBaseNodeParser<NodeRedBlackTree> parser,
                                   ITreeValidatorProvider<NodeRedBlackTree> treeValidatorProvider)
        : base(repository, translator, uniquenessValidator, parser, treeValidatorProvider)
        {
        }

    }
}
