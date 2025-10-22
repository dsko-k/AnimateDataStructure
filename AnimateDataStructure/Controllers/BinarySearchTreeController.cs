using AnimateDataStructure.Core.DTOs;
using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Services.LoggingService;
using AnimateDataStructure.Core.Services.TreeServices;
using AnimateDataStructure.Web.Helpers;
using AnimateDataStructure.Web.Mapper;
using AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels;
using AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace AnimateDataStructure.Web.Controllers
{
    //public class BinarySearchTreeController : Controller
    //{
    //    private readonly IAntiforgery antiforgery;
    //    private readonly BinarySearchTreeService bstService;

    //    // Use dependency injection to get an instance of the IAntiforgery service.
    //    // This is enabled by the `builder.Services.AddAntiforgery()` call in Program.cs.
    //    public BinarySearchTreeController(IAntiforgery antiforgery, BinarySearchTreeService bstService)
    //    {
    //        this.antiforgery = antiforgery;
    //        this.bstService = bstService;
    //    }



    //    public async Task<IActionResult> Template()
    //    {
    //        var tempGuid = Guid.NewGuid();
    //        ViewBag.TempGuid = tempGuid;


    //        return View();
    //    }


    //    /// <summary>
    //    /// This is a new dedicated GET action that provides a fresh anti-forgery token.
    //    /// JavaScript function `getFreshAntiForgeryToken()` will call this endpoint
    //    /// </summary>
    //    [HttpGet]
    //    public IActionResult GetAntiForgeryToken()
    //    {
    //        // Get and store a new token for the current session.
    //        var tokens = antiforgery.GetAndStoreTokens(HttpContext);

    //        // Return the token as a JSON object like: { "token": "..." } to consume on the client side
    //        return Ok(new { token = tokens.RequestToken });
    //    }


    //    [HttpPost]
    //    [ValidateAntiForgeryToken]
    //    public async Task<IActionResult> AddNode([FromForm] InputNodeViewModel formData)
    //    {
    //        if (ModelState.IsValid)
    //        {
    //            return Json(new { success = true }); // HTTP 200 OK
    //        }

    //        return BadRequest(ModelState);
    //    }


    //    [HttpPost]
    //    [ValidateAntiForgeryToken]
    //    public async Task<IActionResult> FindNode([FromForm] InputNodeViewModel formData)
    //    {
    //        if (ModelState.IsValid)
    //        {
    //            return Json(new { success = true }); // HTTP 200 OK
    //        }

    //        return BadRequest(ModelState);
    //    }


    //    [HttpPost]
    //    [ValidateAntiForgeryToken]
    //    public async Task<IActionResult> DeleteNode([FromForm] InputNodeViewModel formData)
    //    {
    //        if (ModelState.IsValid)
    //        {
    //            return Json(new { success = true }); // HTTP 200 OK
    //        }

    //        return BadRequest(ModelState);
    //    }


    //    [HttpPost]
    //    [ValidateAntiForgeryToken]
    //    public async Task<IActionResult> TraverseInorder([FromForm] TraverseNodesViewModel formData)
    //    {
    //        if (ModelState.IsValid)
    //        {
    //            return Json(new { success = true }); // HTTP 200 OK
    //        }

    //        return BadRequest(ModelState);
    //    }


    //    [HttpPost]
    //    [ValidateAntiForgeryToken]
    //    public async Task<IActionResult> TraversePreorder([FromForm] TraverseNodesViewModel formData)
    //    {
    //        if (ModelState.IsValid)
    //        {
    //            return Json(new { success = true }); // HTTP 200 OK
    //        }

    //        return BadRequest(ModelState);
    //    }


    //    [HttpPost]
    //    [ValidateAntiForgeryToken]
    //    public async Task<IActionResult> TraversePostorder([FromForm] TraverseNodesViewModel formData)
    //    {
    //        if (ModelState.IsValid)
    //        {
    //            return Json(new { success = true }); // HTTP 200 OK
    //        }

    //        return BadRequest(ModelState);
    //    }


    //    //[HttpPost]
    //    //[ValidateAntiForgeryToken]
    //    //public async Task<IActionResult> SaveNodes([FromForm] SaveBinarySearchTreeViewModel formData)
    //    //{
    //    //    if (!ModelState.IsValid)
    //    //    {
    //    //        return BadRequest(ModelState);
    //    //    }

    //    //    // Get the current user's ID from the claims
    //    //    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

    //    //    // Map the ViewModel to the specific DTO
    //    //    var saveBinarySearchTreeNodesDto = TranslatorSaveTreeViewModelToDto.TranslateToSaveTreeDto<SaveBinarySearchTreeViewModel, SaveBinarySearchTreeDto>(formData);

    //    //    // Pass the specific DTO to the service
    //    //    await bstService.SaveNodesAsync(saveBinarySearchTreeNodesDto, userId);

    //    //    return Json(new { success = true }); // HTTP 200 OK
    //    //}


    //    [HttpPost]
    //    [ValidateAntiForgeryToken]
    //    public async Task<IActionResult> SaveNodes([FromForm] SaveBinarySearchTreeViewModel formData)
    //    {
    //        // 1. Initial Model Validation
    //        if (!ModelState.IsValid)
    //        {
    //            return BadRequest(ModelState);
    //        }

    //        // 2. Map ViewModel to DTO
    //        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    //        var saveBinarySearchTreeNodesDto = TranslatorSaveTreeViewModelToDto.TranslateToSaveTreeDto<SaveBinarySearchTreeViewModel, SaveBinarySearchTreeDto>(formData);

    //        // 3. Call the Service and handle the result
    //        var result = await bstService.SaveNodesAsync(saveBinarySearchTreeNodesDto, userId);

    //        if (!result.IsSuccess)
    //        {
    //            // Add the error message from the service to the ModelState
    //            ModelState.AddServiceResultErrorsToModelState(result);
    //            return BadRequest(ModelState);
    //        }

    //        // 4. Return success if all logic passes
    //        return Json(new { success = true }); // HTTP 200 OK
    //    }

    //}


    public class BinarySearchTreeController : BaseTreeController<BinarySearchTreeService, SaveBinarySearchTreeViewModel, SaveBinarySearchTreeDto>
    {
        public BinarySearchTreeController(IAntiforgery antiforgery, 
            BinarySearchTreeService bstService,
            ITreeControllerLogger treeControllerLogger)
            : base(antiforgery, bstService, treeControllerLogger)
        {
        }
    }
}
