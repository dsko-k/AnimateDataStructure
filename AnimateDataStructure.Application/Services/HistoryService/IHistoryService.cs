using AnimateDataStructure.Application.DTOs.HistoryDataStructureDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Services.HistoryService
{
    public interface IHistoryService
    {
        Task<IEnumerable<HistoryDataStructureDto>> GetSavedDataStructuresForUserAsync(string userId);
    }
}
