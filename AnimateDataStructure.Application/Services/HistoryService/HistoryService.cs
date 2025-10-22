using AnimateDataStructure.Core.DTOs.HistoryDataStructureDTOs;
using AnimateDataStructure.Infrastructure.Repositories.GenericRepository;
using AnimateDataStructure.Infrastructure.Repositories.HistoryRepository;


namespace AnimateDataStructure.Core.Services.HistoryService
{
    public class HistoryService : IHistoryService
    {
        private readonly IHistoryQueryRepository historyRepo;

        public HistoryService(IHistoryQueryRepository historyRepo)
        {
            this.historyRepo = historyRepo;
        }

        public async Task<IEnumerable<HistoryDataStructureDto>> GetSavedDataStructuresForUserAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException(nameof(userId), "User ID is required");
            }

            return await historyRepo.GetCombinedHistoryForUserAsync(userId);
        }


    }
}
