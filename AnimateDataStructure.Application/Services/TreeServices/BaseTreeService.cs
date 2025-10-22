using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.Services.NodesValidationService;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationProvider;
using AnimateDataStructure.Core.Translators;
using AnimateDataStructure.Core.ValidationErrors;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Infrastructure.Repositories.GenericRepository;

namespace AnimateDataStructure.Core.Services.TreeServices
{
    public abstract class BaseTreeService<TTree, TDto, TNode> : IBaseTreeService<TDto>
     where TTree : class, IDataStructure<TNode>, new()
     where TDto : AbstractSaveTreeDto
     where TNode : class, INode, new()
    {
        private readonly IGenericRepository<TTree> repository;
        private readonly IBaseTreeTranslator<TTree, TDto, TNode> translator;
        private readonly INodeValueUniquenessValidator uniquenessValidator;
        private readonly IBaseNodeParser<TNode> parser;

        // ????
        private readonly ITreeValidatorProvider<TNode> treeValidatorProvider;


        public BaseTreeService(IGenericRepository<TTree> repository,
                               IBaseTreeTranslator<TTree, TDto, TNode> translator,
                               INodeValueUniquenessValidator uniquenessValidator,
                               IBaseNodeParser<TNode> parser,
                               ITreeValidatorProvider<TNode> treeValidatorProvider)
        {
            this.repository = repository;
            this.translator = translator;
            this.uniquenessValidator = uniquenessValidator;
            this.parser = parser;
            this.treeValidatorProvider = treeValidatorProvider;
        }


        //public virtual async Task<ServiceResult> SaveNodesAsync(TDto dto, string userId)
        //{
        //    var validationResult = validator.ValidateNodesUniqueness(dto, parser);

        //    if (!validationResult.IsSuccess)
        //    {
        //        return validationResult;
        //    }

        //    return await CreateOrUpdateTreeAsync(dto, userId);
        //}

        public virtual async Task<ServiceResult> SaveNodesAsync(TDto dto, string userId)
        {
            // Node Value Uniqueness Validation
            var validationResult = ValidateNodeValuesUniqueness(dto);

            if (!validationResult.IsSuccess)
            {
                return validationResult;
            }

            // Tree Structure Validation
            var structureResult = ValidateTreeStructure(dto);

            if (!structureResult.IsSuccess)
            {
                return structureResult;
            }

            // Persistence Logic
            return await CreateOrUpdateTreeAsync(dto, userId);
        }


        protected ServiceResult ValidateNodeValuesUniqueness(TDto dto)
        {
            return uniquenessValidator.ValidateNodesUniqueness(dto, parser);
        }


        protected ServiceResult ValidateTreeStructure(TDto dto)
        {
            // Parse the input nodes first
            var nodes = parser.ParseNodeValues(dto.InputValue);

            // Use the provider to get the correct, instantiated validator
            var validator = treeValidatorProvider.GetValidator(nodes);

            // Run the structure check
            return validator.ValidateStructure();
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
    }
}
