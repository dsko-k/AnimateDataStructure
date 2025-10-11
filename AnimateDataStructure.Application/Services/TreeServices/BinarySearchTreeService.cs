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
