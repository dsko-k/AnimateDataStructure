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
    public class BinarySearchTreeService : BaseTreeService<BinarySearchTree, SaveBinarySearchTreeDto, NodeBinarySearchTree>
    {
        public BinarySearchTreeService(IGenericRepository<BinarySearchTree> bstRepository,
                                       IBaseTreeTranslator<BinarySearchTree, SaveBinarySearchTreeDto, NodeBinarySearchTree> translator,
                                       INodeValueUniquenessValidator uniquenessValidator,
                                       IBaseNodeParser<NodeBinarySearchTree> parser,
                                       ITreeValidatorProvider<NodeBinarySearchTree> treeValidatorProvider)
                                       : base(bstRepository, translator, uniquenessValidator, parser, treeValidatorProvider)
        {
        }
    }

}
