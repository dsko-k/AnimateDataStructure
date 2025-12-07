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
    public class MinHeapService : BaseTreeService<MinHeap, SaveMinHeapDto, NodeMinHeap>
    {
        public MinHeapService(IGenericRepository<MinHeap> minHeapRepository,
                              IBaseTreeTranslator<MinHeap, SaveMinHeapDto, NodeMinHeap> translator,
                              INodeValueUniquenessValidator uniquenessValidator,
                              IBaseNodeParser<NodeMinHeap> parser,
                              ITreeValidatorProvider<NodeMinHeap> treeValidatorProvider,
                              IDataLoader<MinHeap, NodeMinHeap> dataLoader)
        : base(minHeapRepository, translator, uniquenessValidator, parser, treeValidatorProvider, dataLoader)
        {
        }
    }
}
