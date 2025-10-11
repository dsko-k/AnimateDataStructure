using AnimateDataStructure.Application.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Application.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Services.TreeServices
{
    public interface IBaseTreeService<in TDto> where TDto : AbstractSaveTreeDto
    {
        Task<ServiceResult> SaveNodesAsync(TDto dto, string userId);
    }
}
