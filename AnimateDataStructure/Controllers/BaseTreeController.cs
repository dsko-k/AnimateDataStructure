using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
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
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

        public async Task<IActionResult> Template()
        {
            if (ViewData[ViewDataKeys.TempGuid] == null)
            {
                ViewData[ViewDataKeys.TempGuid] = Guid.NewGuid();
            }
            return View();
        }

        [HttpGet]
        [Authorize]
        [Route("{controller}/LoadSavedDataStructure/{tempGuid:guid}")]
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
                return NotFound();
            }
            ViewData[ViewDataKeys.SavedDataStructureNodes] = fullNodeData;
            ViewData[ViewDataKeys.TempGuid] = tempGuid;
            return View("Template");
        }

        /// <summary>
        /// This is a new dedicated GET action that provides a fresh anti-forgery token.
        /// JavaScript function `getFreshAntiForgeryToken()` will call this endpoint
        /// </summary>
        [HttpGet]
        public IActionResult GetAntiForgeryToken()
        {
            var tokens = antiforgery.GetAndStoreTokens(HttpContext); // Get and store a new token for the current session            
            return Ok(new { token = tokens.RequestToken });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddNode([FromForm] AddNodeViewModel formData)
        {
            // '_ = ' syntax discards the task, making it "fire-and-forget"
            _ = TreeControllerLogger.LogInputData(this.GetType().Name, nameof(AddNode), formData);
            if (ModelState.IsValid)
            {
                return Json(new { success = true });
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
                return Json(new { success = true });
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
                return Json(new { success = true });
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
                return Json(new { success = true });
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
                return Json(new { success = true });
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
                return Json(new { success = true });
            }
            return BadRequest(ModelState);
        }

        // The generic action should be overriden in derived classes: the router cannot determine what TViewModel is at runtime        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public virtual async Task<IActionResult> SaveNodes([FromForm] TViewModel formData)
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
