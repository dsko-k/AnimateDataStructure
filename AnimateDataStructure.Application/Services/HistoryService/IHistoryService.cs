using AnimateDataStructure.Core.DTOs.HistoryDataStructureDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Services.HistoryService
{
    public interface IHistoryService
    {
        Task<IEnumerable<HistoryDataStructureDto>> GetSavedDataStructuresForUserAsync(string userId);
    }
}
