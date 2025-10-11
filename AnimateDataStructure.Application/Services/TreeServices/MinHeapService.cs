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
    //public class MinHeapService
    //{
    //    private readonly IMinHeapRepository minHeapRepository;
    //    private readonly TranslatorSaveTree<MinHeap, NodeMinHeap> translatorSaveTree;
    //    private readonly NodeValueValidator validator;
    //    private readonly CommonNodeValueParser parser;


    //    public MinHeapService(IMinHeapRepository minHeapRepository, 
    //                          TranslatorSaveTree<MinHeap, NodeMinHeap> translatorSaveTree,
    //                          NodeValueValidator validator,
    //                          CommonNodeValueParser parser)
    //    {
    //        this.minHeapRepository = minHeapRepository;
    //        this.translatorSaveTree = translatorSaveTree;
    //        this.validator = validator;
    //        this.parser = parser;
    //    }


    //    //public async Task SaveNodesAsync(SaveMinHeapDto saveMinHeapNodesDto, string userId)
    //    //{
    //    //    var guid = Guid.Parse(saveMinHeapNodesDto.TempGuid);
    //    //    var existingTree = await minHeapRepository.GetByTempGuidAsync(guid);

    //    //    if (existingTree != null)
    //    //    {
    //    //        // UPDATE: Use the generic translator to update the existing entity
    //    //        translatorSaveTree.UpdateTreeFromDto(saveMinHeapNodesDto, existingTree);
    //    //        await minHeapRepository.UpdateAsync(existingTree);
    //    //    }
    //    //    else
    //    //    {
    //    //        // CREATE: Use the generic translator to create a new entity
    //    //        var newTree = translatorSaveTree.CreateTreeFromDto(saveMinHeapNodesDto, userId);
    //    //        await minHeapRepository.AddAsync(newTree);
    //    //    }
    //    //    await minHeapRepository.SaveChangesAsync();
    //    //}



    //    // Orchestrate the workflow
    //    public async Task<ServiceResult> SaveNodesAsync(SaveMinHeapDto saveMinHeapDto, string userId)
    //    {
    //        // 1. Orchestrate the workflow
    //        var validationResult = ValidateNodeValuesUniqueness(saveMinHeapDto);

    //        if (!validationResult.IsSuccess)
    //        {
    //            return validationResult;
    //        }

    //        return await CreateOrUpdateTreeAsync(saveMinHeapDto, userId);
    //    }


    //    // Perform all validation checks
    //    private ServiceResult ValidateNodeValuesUniqueness(SaveMinHeapDto saveMinHeapDto)
    //    {
    //        var newValues = parser.ParseNodeValues(saveMinHeapDto.InputValue);

    //        // The validator now returns a raw string of duplicates, not a formatted message
    //        var rawDuplicates = validator.ValidateUniqueness(newValues);

    //        if (rawDuplicates != null)
    //        {
    //            return ServiceResult.CreateFailureResult(ValidationErrorKeys.DuplicateValues, rawDuplicates);
    //        }

    //        return ServiceResult.Success();
    //    }


    //    // Handle the core business logic
    //    private async Task<ServiceResult> CreateOrUpdateTreeAsync(SaveMinHeapDto saveMinHeapDto, string userId)
    //    {
    //        var existingTree = await minHeapRepository.GetByTempGuidAsync(Guid.Parse(saveMinHeapDto.TempGuid));

    //        if (existingTree != null)
    //        {
    //            translatorSaveTree.UpdateTreeFromDto(saveMinHeapDto, existingTree);
    //            await minHeapRepository.UpdateAsync(existingTree);
    //        }
    //        else
    //        {
    //            var newTree = translatorSaveTree.CreateTreeFromDto(saveMinHeapDto, userId);
    //            await minHeapRepository.AddAsync(newTree);
    //        }

    //        await minHeapRepository.SaveChangesAsync();

    //        return ServiceResult.Success();
    //    }

    //}

    public class MinHeapService : BaseTreeService<MinHeap, SaveMinHeapDto, NodeMinHeap>
    {
        public MinHeapService(IGenericRepository<MinHeap> minHeapRepository,
                              IBaseTreeTranslator<MinHeap, SaveMinHeapDto, NodeMinHeap> translator,
                              INodeValueUniquenessValidator uniquenessValidator,
                              IBaseNodeParser<NodeMinHeap> parser,
                              ITreeValidatorProvider<NodeMinHeap> treeValidatorProvider)
                              : base(minHeapRepository, translator, uniquenessValidator, parser, treeValidatorProvider)
        {
        }
    }
}
