using AnimateDataStructure.Core.DTOs.HistoryDataStructureDTOs;
using AnimateDataStructure.Core.Entities;
using AnimateDataStructure.Core.Services.HistoryService;
using AnimateDataStructure.Web.ViewModels.AuthenticationViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using ILogger = Serilog.ILogger;
using System.Diagnostics;

namespace AnimateDataStructure.Web.Controllers
{
    [Authorize]
    public class HistoryController : Controller
    {
        private readonly IHistoryService historyService;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ILogger logger;

        public HistoryController(IHistoryService historyService, UserManager<ApplicationUser> userManager)
        {
            this.historyService = historyService;
            this.userManager = userManager;
            logger = Log.ForContext<HistoryController>();
        }

        //// GET /History/SavedDataStructures
        //[HttpGet]
        //public async Task<IActionResult> SavedDataStructures()
        //{
        //    var userId = userManager.GetUserId(User);

        //    if (string.IsNullOrEmpty(userId))
        //    {
        //        logger.Warning("Attempt to access SavedDataStructures without a valid User ID in an authorized session");
        //        return Unauthorized();
        //    }

        //    IEnumerable<HistoryDataStructureDto> savedStructures;

        //    try
        //    {
        //        // 2. Call the service to perform the business logic/data retrieval
        //        savedStructures = await historyService.GetSavedDataStructuresForUserAsync(userId);

        //        // 3. Log a successful operation (Good practice)
        //        logger.Information("User {UserId} successfully retrieved {Count} saved data structures.", userId, savedStructures.Count());
        //    }
        //    catch (Exception ex)
        //    {
        //        logger.Error(ex, "Error retrieving history data structures for user {UserId}.", userId);

        //        return View("Error", new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
        //    }

        //    // 5. Pass the DTO collection to the view
        //    return View(savedStructures);
        //}


        // GET /History/SavedDataStructures
        [HttpGet]
        public async Task<IActionResult> SavedDataStructures()
        {
            var userId = userManager.GetUserId(User);

            if (string.IsNullOrEmpty(userId))
            {
                // logger.Warning is usually fast enough to be left synchronous, 
                // but can be offloaded for absolute safety.
                _ = Task.Run(() =>
                {
                    logger.Warning("Attempt to access SavedDataStructures without a valid User ID in an authorized session");
                });
                return Unauthorized();
            }

            IEnumerable<HistoryDataStructureDto> savedStructures;

            try
            {
                savedStructures = await historyService.GetSavedDataStructuresForUserAsync(userId);

                // Offload the synchronous logging call using Task.Run() ⭐️
                // The '_ = ' syntax discards the task, making it "fire-and-forget"
                _ = Task.Run(() =>
                {
                    // The logging context and variables are captured for the background thread
                    logger.Information("User {UserId} successfully retrieved {Count} saved data structures.",
                                       userId,
                                       savedStructures.Count());
                });

                return View(savedStructures);
            }
            catch (Exception ex)
            {
                // ⭐️ FIX: Also offload the synchronous Error log ⭐️
                _ = Task.Run(() =>
                {
                    logger.Error(ex, "Error retrieving history data structures for user {UserId}.", userId);
                });

                // Ensure you return the view immediately after offloading the log
                return View("Error", new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
            }
        }
    }
}
