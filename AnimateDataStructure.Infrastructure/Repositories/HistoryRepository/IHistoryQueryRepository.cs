using AnimateDataStructure.Core.DTOs.HistoryDataStructureDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Infrastructure.Repositories.HistoryRepository
{
    public interface IHistoryQueryRepository
    {
        // The contract: Fetches the aggregated DTOs for a specific user.
        Task<IEnumerable<HistoryDataStructureDto>> GetCombinedHistoryForUserAsync(string userId);
    }
}
