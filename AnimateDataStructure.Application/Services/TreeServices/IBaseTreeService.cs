using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Results;

namespace AnimateDataStructure.Core.Services.TreeServices
{
    public interface IBaseTreeService<in TDto> where TDto : AbstractSaveTreeDto
    {
        Task<ServiceResult> SaveNodesAsync(TDto dto, string userId);

        Task<string?> GetFullNodeDataByTempGuidAsync(Guid tempGuid, string userId);
    }
}
