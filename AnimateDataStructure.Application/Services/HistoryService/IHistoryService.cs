using AnimateDataStructure.Core.DTOs.HistoryDataStructureDTOs;

namespace AnimateDataStructure.Core.Services.HistoryService
{
    public interface IHistoryService
    {
        Task<IEnumerable<HistoryDataStructureDto>> GetSavedDataStructuresForUserAsync(string userId);
    }
}
