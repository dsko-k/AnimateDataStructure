using AnimateDataStructure.Application.Services.LoadingService;
using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Services.NodesValidationService;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationProvider;
using AnimateDataStructure.Core.Translators;
using AnimateDataStructure.Infrastructure.Repositories.GenericRepository;

namespace AnimateDataStructure.Core.Services.TreeServices
{
    public class MaxHeapService : BaseTreeService<MaxHeap, SaveMaxHeapDto, NodeMaxHeap>
    {
        public MaxHeapService(IGenericRepository<MaxHeap> maxHeapRepository,
                              IBaseTreeTranslator<MaxHeap, SaveMaxHeapDto, NodeMaxHeap> translator,
                              INodeValueUniquenessValidator uniquenessValidator,
                              IBaseNodeParser<NodeMaxHeap> parser,
                              ITreeValidatorProvider<NodeMaxHeap> treeValidatorProvider,
                              IDataLoader<MaxHeap, NodeMaxHeap> dataLoader)
        : base(maxHeapRepository, translator, uniquenessValidator, parser, treeValidatorProvider, dataLoader)
        {
        }
    }
}
