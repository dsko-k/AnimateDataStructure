using AnimateDataStructure.Core.DTOs;
using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.Services.LoggingService;
using AnimateDataStructure.Core.Services.TreeServices;
using AnimateDataStructure.Web.Helpers;
using AnimateDataStructure.Web.Mapper;
using AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels;
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
            TreeControllerLogger.LogInputData(this.GetType().Name, nameof(SaveNodes), formData);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // 2. Map ViewModel to DTO
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                ModelState.AddServiceResultErrorsToModelState(ServiceResult.UserNotFound());
                return BadRequest(ModelState);
            }

            var saveRedBlackTreeNodesDto = TranslatorSaveTreeViewModelToDto.TranslateToSaveRedBlackTreeDto(formData);

            // DO NOT DELETE:
            // Call the Service and handle the result
            // Use the 'Service' property from the base class instead of the redBlackTreeService
            // The Service property is already an instance of RedBlackTreeService due to the generic type parameter
            var result = await Service.SaveNodesAsync(saveRedBlackTreeNodesDto, userId);

            if (!result.IsSuccess)
            {
                // Add the error message from the service to the ModelState
                ModelState.AddServiceResultErrorsToModelState(result);
                return BadRequest(ModelState);
            }

            // 4. Return success if all logic passes
            return Json(new { success = true }); // HTTP 200 OK
        }

    }
}

