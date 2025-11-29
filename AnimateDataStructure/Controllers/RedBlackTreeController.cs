using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.Services.LoggingService;
using AnimateDataStructure.Core.Services.TreeServices;
using AnimateDataStructure.Web.Helpers;
using AnimateDataStructure.Web.Mapper;
using AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AnimateDataStructure.Web.Controllers
{
    public class RedBlackTreeController : BaseTreeController<RedBlackTreeService, SaveRedBlackTreeViewModel, SaveRedBlackTreeDto>
    {
        public RedBlackTreeController(IAntiforgery antiforgery, 
                                      RedBlackTreeService redBlackTreeService,
                                      ITreeControllerLogger treeControllerLogger)
            : base(antiforgery, redBlackTreeService, treeControllerLogger)
        {
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public override async Task<IActionResult> SaveNodes([FromForm] SaveRedBlackTreeViewModel formData)
        {
            _ = TreeControllerLogger.LogInputData(this.GetType().Name, nameof(SaveNodes), formData);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                ModelState.AddServiceResultErrorsToModelState(ServiceResult.UserNotFound());
                return BadRequest(ModelState);
            }
            var saveRedBlackTreeNodesDto = TranslatorSaveTreeViewModelToDto.TranslateToSaveRedBlackTreeDto(formData);
            // Call the Service and handle the result
            // Use the 'Service' property from the base class instead of the redBlackTreeService
            // The Service property is already an instance of RedBlackTreeService due to the generic type parameter
            var result = await Service.SaveNodesAsync(saveRedBlackTreeNodesDto, userId);
            if (!result.IsSuccess)
            {
                ModelState.AddServiceResultErrorsToModelState(result);
                return BadRequest(ModelState);
            }
            return Json(new { success = true });
        }
    }
}

