using AnimateDataStructure.Core.Entities.CardEntities;

namespace AnimateDataStructure.Application.Services.DataStructuresListService
{
    public interface IDataStructureListService
    {
        Task<List<DataStructureListCard>> GetAvailableDataStructuresAsync();
    }
}
