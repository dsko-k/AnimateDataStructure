using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;

namespace AnimateDataStructure.Core.Translators
{
    public interface IBaseTreeTranslator<TTree, in TDto, TNode>
    where TTree : class, IDataStructure<TNode>, new()
    where TDto : AbstractSaveTreeDto
    where TNode : class, INode, new()
    {
        TTree CreateTreeFromDto(TDto dto, string userId);

        void UpdateTreeFromDto(TDto dto, TTree existingTree);
    }
}
