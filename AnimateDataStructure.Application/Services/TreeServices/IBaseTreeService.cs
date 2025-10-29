using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Services.TreeServices
{
    public interface IBaseTreeService<in TDto> where TDto : AbstractSaveTreeDto
    {
        Task<ServiceResult> SaveNodesAsync(TDto dto, string userId);

        Task<string?> GetFullNodeDataByTempGuidAsync(Guid tempGuid, string userId);
    }
}
