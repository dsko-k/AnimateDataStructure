using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Translators
{
    public abstract class BaseTreeTranslator<TTree, TNode, TDto> : IBaseTreeTranslator<TTree, AbstractSaveTreeDto, TNode>
    where TTree : class, IDataStructure<TNode>, new()
    where TNode : class, INode, new()
    where TDto : AbstractSaveTreeDto
    {
        private readonly BaseNodeParser<TNode> parser;

        protected BaseTreeTranslator(BaseNodeParser<TNode> parser)
        {
            this.parser = parser;
        }


        public virtual TTree CreateTreeFromDto(AbstractSaveTreeDto dto, string userId)
        {
            // Must cast to the specific DTO type (TDto) to ensure correct property access
            var specificDto = (TDto)dto;

            var tree = new TTree
            {
                TempGuid = Guid.Parse(specificDto.TempGuid),
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            PopulateTreeWithNodes(tree, specificDto.InputValue);

            return tree;
        }


        private void PopulateTreeWithNodes(TTree tree, string inputValue)
        {
            var nodes = parser.ParseNodeValues(inputValue);

            foreach (var node in nodes)
            {
                tree.Nodes.Add(node);
            }
        }


        private void ClearExistingNodes(TTree tree)
        {
            if (tree.Nodes != null)
            {
                tree.Nodes.Clear();
            }
        }


        public virtual void UpdateTreeFromDto(AbstractSaveTreeDto dto, TTree existingTree)
        {
            var specificDto = (TDto)dto;

            existingTree.UpdatedAt = DateTime.UtcNow;

            // 1. Update: Clear existing nodes
            ClearExistingNodes(existingTree);

            // 2. Update: Populate the new nodes
            PopulateTreeWithNodes(existingTree, specificDto.InputValue);
        }
    }
}
