using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Translators
{
    public class RedBlackTreeTranslator : IBaseTreeTranslator<RedBlackTree, SaveRedBlackTreeDto, NodeRedBlackTree>
    {
        private readonly RedBlackTreeNodeParser parser;

        // Use constructor injection to receive the parser
        public RedBlackTreeTranslator(RedBlackTreeNodeParser parser)
        {
            this.parser = parser;
        }

        public RedBlackTree CreateTreeFromDto(SaveRedBlackTreeDto dto, string userId)
        {
            var redBlackTree = new RedBlackTree
            {
                TempGuid = Guid.Parse(dto.TempGuid),
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            // Delegate parsing to the specialized parser
            //redBlackTree.Nodes = parser.Parse(dto.InputValue);
            PopulateTreeNodes(redBlackTree, dto.InputValue);

            return redBlackTree;
        }


        private void PopulateTreeNodes(RedBlackTree tree, string inputValue)
        {
            tree.Nodes = parser.ParseNodeValues(inputValue); // requires assigning a new collection of nodes
        }


        public void UpdateTreeFromDto(SaveRedBlackTreeDto dto, RedBlackTree existingTree)
        {
            existingTree.UpdatedAt = DateTime.UtcNow;

            ClearExistingNodes(existingTree);

            PopulateTreeNodes(existingTree, dto.InputValue);
        }


        private void ClearExistingNodes(RedBlackTree tree)
        {
            if (tree.Nodes != null)
            {
                tree.Nodes.Clear();
            }
        }

    }
}
