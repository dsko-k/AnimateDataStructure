using AnimateDataStructure.Application.Services.LoadingService;
using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.Services.NodesValidationService;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationProvider;
using AnimateDataStructure.Core.Translators;
using AnimateDataStructure.Core.ValidationErrors;
using AnimateDataStructure.Infrastructure.Repositories.GenericRepository;

namespace AnimateDataStructure.Core.Services.TreeServices
{
    public class RedBlackTreeService : BaseTreeService<RedBlackTree, SaveRedBlackTreeDto, NodeRedBlackTree>
    {        
        public RedBlackTreeService(IGenericRepository<RedBlackTree> repository,
                                   IBaseTreeTranslator<RedBlackTree, SaveRedBlackTreeDto, NodeRedBlackTree> translator,
                                   INodeValueUniquenessValidator uniquenessValidator,        
                                   IBaseNodeParser<NodeRedBlackTree> parser,
                                   ITreeValidatorProvider<NodeRedBlackTree> treeValidatorProvider,
                                   IDataLoader<RedBlackTree, NodeRedBlackTree> dataLoader)
        : base(repository, translator, uniquenessValidator, parser, treeValidatorProvider, dataLoader)
        {
        }
    }
}
