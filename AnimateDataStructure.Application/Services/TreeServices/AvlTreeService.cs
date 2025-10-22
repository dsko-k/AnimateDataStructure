using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.Services.NodesValidationService;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationProvider;
using AnimateDataStructure.Core.Translators;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Infrastructure.Repositories.GenericRepository;

namespace AnimateDataStructure.Core.Services.TreeServices
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
