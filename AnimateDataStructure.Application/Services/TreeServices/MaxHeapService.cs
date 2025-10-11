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
    public class MaxHeapService : BaseTreeService<MaxHeap, SaveMaxHeapDto, NodeMaxHeap>
    {
        public MaxHeapService(IGenericRepository<MaxHeap> maxHeapRepository,
                              IBaseTreeTranslator<MaxHeap, SaveMaxHeapDto, NodeMaxHeap> translator,
                              INodeValueUniquenessValidator uniquenessValidator,
                              IBaseNodeParser<NodeMaxHeap> parser,
                              ITreeValidatorProvider<NodeMaxHeap> treeValidatorProvider)
                              : base(maxHeapRepository, translator, uniquenessValidator, parser, treeValidatorProvider)
        {
        }
    }
}
