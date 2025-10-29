using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.Services.LoggingService;
using AnimateDataStructure.Core.Services.TreeServices;
using AnimateDataStructure.Web.Constants;
using AnimateDataStructure.Web.Helpers;
using AnimateDataStructure.Web.Mapper;
using AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels;
using AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;


namespace AnimateDataStructure.Web.Controllers
{
    public abstract class BaseTreeController<TService, TViewModel, TDto> : Controller
    where TService : IBaseTreeService<TDto> // This is the correct, fixed constraint
    where TViewModel : BaseSaveTreeViewModel, IHasAuthenticatedProperty
    where TDto : AbstractSaveTreeDto, IHasAuthenticatedProperty, new()
    {
        protected readonly IAntiforgery antiforgery;
        protected readonly TService Service;
        protected readonly ITreeControllerLogger TreeControllerLogger;


        protected BaseTreeController(IAntiforgery antiforgery, TService service, ITreeControllerLogger treeControllerLogger)
        {
            this.antiforgery = antiforgery;
            Service = service;
            TreeControllerLogger = treeControllerLogger;
        }


        //public async Task<IActionResult> Template()
        //{
        //    var tempGuid = Guid.NewGuid();
        //    ViewData.TempGuid = tempGuid;

        //    return View();
        //}


        public async Task<IActionResult> Template()
        {
            // 1. If TempGuid is already in ViewData (passed by LoadSavedDataStructure), use it.
            // 2. Otherwise, generate a new one for new creation.
            // The logic for ViewData.TempGuid is implicitly handled by LoadSavedDataStructure
            // when loading saved data, or remains unset for a new instance

            // This action can now be called directly (unauthorized) or by a redirect (authorized)
            if (ViewData[ViewDataKeys.TempGuid] == null)
            {
                ViewData[ViewDataKeys.TempGuid] = Guid.NewGuid();
            }

            return View();
        }


        [HttpGet]
        [Authorize]
        [Route("{controller}/LoadSavedDataStructure/{tempGuid:guid}")] // Uses a route parameter
        public virtual async Task<IActionResult> LoadSavedDataStructure(Guid tempGuid)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            string? fullNodeData = await Service.GetFullNodeDataByTempGuidAsync(tempGuid, userId);

            if (string.IsNullOrEmpty(fullNodeData))
            {
                // Data not found (either bad GUID or unauthorized user access)
                return NotFound();
            }

            ViewData[ViewDataKeys.SavedDataStructureNodes] = fullNodeData;
            ViewData[ViewDataKeys.TempGuid] = tempGuid;

            // Display the Template view with the data loaded into ViewData
            return View("Template");
        }




        /// <summary>
        /// This is a new dedicated GET action that provides a fresh anti-forgery token.
        /// JavaScript function `getFreshAntiForgeryToken()` will call this endpoint
        /// </summary>
        [HttpGet]
        public IActionResult GetAntiForgeryToken()
        {
            // Get and store a new token for the current session.
            var tokens = antiforgery.GetAndStoreTokens(HttpContext);

            // Return the token as a JSON object like: { "token": "..." } to consume on the client side
            return Ok(new { token = tokens.RequestToken });
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddNode([FromForm] AddNodeViewModel formData)
        {
            // The '_ = ' syntax discards the task, making it "fire-and-forget"
            _ = TreeControllerLogger.LogInputData(this.GetType().Name, nameof(AddNode), formData);

            if (ModelState.IsValid)
            {
                return Json(new { success = true }); // HTTP 200 OK
            }

            return BadRequest(ModelState);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> FindNode([FromForm] FindNodeViewModel formData)
        {
            _ = TreeControllerLogger.LogInputData(this.GetType().Name, nameof(FindNode), formData);

            if (ModelState.IsValid)
            {
                return Json(new { success = true }); // HTTP 200 OK
            }

            return BadRequest(ModelState);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteNode([FromForm] DeleteNodeViewModel formData)
        {
            _ = TreeControllerLogger.LogInputData(this.GetType().Name, nameof(DeleteNode), formData);

            if (ModelState.IsValid)
            {
                return Json(new { success = true }); // HTTP 200 OK
            }

            return BadRequest(ModelState);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> TraverseInorder([FromForm] TraverseNodesViewModel formData)
        {
            _ = TreeControllerLogger.LogInputData(this.GetType().Name, nameof(TraverseInorder), formData);

            if (ModelState.IsValid)
            {
                return Json(new { success = true }); // HTTP 200 OK
            }

            return BadRequest(ModelState);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> TraversePreorder([FromForm] TraverseNodesViewModel formData)
        {
            _ = TreeControllerLogger.LogInputData(this.GetType().Name, nameof(TraversePreorder), formData);

            if (ModelState.IsValid)
            {
                return Json(new { success = true }); // HTTP 200 OK
            }

            return BadRequest(ModelState);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> TraversePostorder([FromForm] TraverseNodesViewModel formData)
        {
            _ = TreeControllerLogger.LogInputData(this.GetType().Name, nameof(TraversePostorder), formData);

            if (ModelState.IsValid)
            {
                return Json(new { success = true }); // HTTP 200 OK
            }

            return BadRequest(ModelState);
        }


        // The generic action should be overriden in derived classes: the router cannot determine what TViewModel is at runtime.
        // It needs to create a valid, unambiguous route for that endpoint
        [HttpPost]
        [ValidateAntiForgeryToken]
        public virtual async Task<IActionResult> SaveNodes([FromForm] TViewModel formData)
        {
            // The '_ = ' syntax discards the task, making it "fire-and-forget"
            _ = TreeControllerLogger.LogInputData(this.GetType().Name, nameof(SaveNodes), formData);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Check if the user was found
            if (string.IsNullOrEmpty(userId))
            {
                ModelState.AddServiceResultErrorsToModelState(ServiceResult.UserNotFound());
                return BadRequest(ModelState);
            }

            var saveDto = TranslatorSaveTreeViewModelToDto.TranslateToSaveTreeDto<TViewModel, TDto>(formData);

            var result = await Service.SaveNodesAsync(saveDto, userId);

            if (!result.IsSuccess)
            {
                ModelState.AddServiceResultErrorsToModelState(result);
                return BadRequest(ModelState);
            }

            return Json(new { success = true });
        }

    }
}
