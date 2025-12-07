using AnimateDataStructure.Application.Services.LoadingService;
using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.Interfaces;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.Services.NodesValidationService;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationProvider;
using AnimateDataStructure.Core.Translators;
using AnimateDataStructure.Infrastructure.Repositories.GenericRepository;

namespace AnimateDataStructure.Core.Services.TreeServices
{
    public abstract class BaseTreeService<TTree, TDto, TNode> : IBaseTreeService<TDto>
    where TTree : class, IDataStructure<TNode>, IHasUserId, new()
    where TDto : AbstractSaveTreeDto
    where TNode : class, INode, new()
    {
        private readonly IGenericRepository<TTree> repository;
        private readonly IBaseTreeTranslator<TTree, TDto, TNode> translator;
        private readonly INodeValueUniquenessValidator uniquenessValidator;
        private readonly IBaseNodeParser<TNode> parser;
        private readonly ITreeValidatorProvider<TNode> treeValidatorProvider;
        private readonly IDataLoader<TTree, TNode> dataLoader;

        public BaseTreeService(IGenericRepository<TTree> repository,
                               IBaseTreeTranslator<TTree, TDto, TNode> translator,
                               INodeValueUniquenessValidator uniquenessValidator,
                               IBaseNodeParser<TNode> parser,
                               ITreeValidatorProvider<TNode> treeValidatorProvider,
                               IDataLoader<TTree, TNode> dataLoader)
        {
            this.repository = repository;
            this.translator = translator;
            this.uniquenessValidator = uniquenessValidator;
            this.parser = parser;
            this.treeValidatorProvider = treeValidatorProvider;
            this.dataLoader = dataLoader;
        }


        public virtual async Task<ServiceResult> SaveNodesAsync(TDto dto, string userId)
        {
            var validationResult = ValidateNodeValuesUniqueness(dto); // Node Value Uniqueness Validation

            if (!validationResult.IsSuccess)
            {
                return validationResult;
            }

            var structureResult = ValidateTreeStructure(dto); // Tree Structure Validation

            if (!structureResult.IsSuccess)
            {
                return structureResult;
            }

            return await CreateOrUpdateTreeAsync(dto, userId); // Persistence Logic
        }


        protected ServiceResult ValidateNodeValuesUniqueness(TDto dto)
        {
            return uniquenessValidator.ValidateNodesUniqueness(dto, parser);
        }


        protected ServiceResult ValidateTreeStructure(TDto dto)
        {
            var nodes = parser.ParseNodeValues(dto.InputValue); // Parse the input nodes first

            var validator = treeValidatorProvider.GetValidator(nodes); // Use the provider to get the correct, instantiated validator

            return validator.ValidateStructure(); // Run the structure check
        }


        protected virtual async Task<ServiceResult> CreateOrUpdateTreeAsync(TDto dto, string userId)
        {
            var guid = Guid.Parse(dto.TempGuid);
            var existingTree = await repository.GetByTempGuidAsync(guid, t => t.Nodes);

            if (existingTree != null)
            {
                translator.UpdateTreeFromDto(dto, existingTree);
                await repository.UpdateAsync(existingTree);
            }
            else
            {
                var newTree = translator.CreateTreeFromDto(dto, userId);
                await repository.AddAsync(newTree);
            }

            await repository.SaveChangesAsync();

            return ServiceResult.Success();
        }


        public async Task<string?> GetFullNodeDataByTempGuidAsync(Guid tempGuid, string userId)
        {
            return await dataLoader.GetFullNodeDataByTempGuidAsync(tempGuid, userId);
        }
    }
}
