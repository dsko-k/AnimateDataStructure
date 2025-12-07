using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.ValidationErrors;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.Parsers;

namespace AnimateDataStructure.Core.Services.NodesValidationService
{
    public class NodeValueUniquenessValidator : INodeValueUniquenessValidator
    {
        // Checks for duplicates within a list of node values
        private string? CheckNodesUniqueness<TNode>(ICollection<TNode> nodeValues)
            where TNode : INode
        {
            var duplicates = nodeValues.GroupBy(x => x.Value)
                                       .Where(g => g.Count() > 1)
                                       .Select(y => y.Key);

            if (duplicates.Any())
            {
                return string.Join(", ", duplicates);
            }

            return null; // if no errors
        }


        public ServiceResult ValidateNodesUniqueness<TDto, TNode>(TDto dto, IBaseNodeParser<TNode> parser)
            where TDto : AbstractSaveTreeDto
            where TNode : INode
        {
            var newValues = parser.ParseNodeValues(dto.InputValue);
            var rawDuplicates = CheckNodesUniqueness(newValues);

            if (rawDuplicates != null)
            {
                return ServiceResult.CreateFailureResult(ValidationErrorKeys.DuplicateValues, rawDuplicates);
            }

            return ServiceResult.Success();
        }


        // Checks for values that already exist against a list of existing nodes
        public string? CheckNodeAgainstExistingNodes<TNode>(double newNodeValueToBeAdded, ICollection<TNode> existingNodes)
            where TNode : class, INode
        {
            if (existingNodes == null)
            {
                return null;
            }

            if (existingNodes.Any(existingNode => existingNode.Value == newNodeValueToBeAdded))
            {
                return newNodeValueToBeAdded.ToString();
            }

            return null; // if no errors
        }
    }
}
