using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Services.LoggingService;
using AnimateDataStructure.Core.Services.TreeServices;
using AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels;
using Microsoft.AspNetCore.Antiforgery;

namespace AnimateDataStructure.Web.Controllers
{
    public class MaxHeapController : BaseTreeController<MaxHeapService, SaveMaxHeapViewModel, SaveMaxHeapDto>
    {
        public MaxHeapController(IAntiforgery antiforgery, 
            MaxHeapService maxHeapService,
            ITreeControllerLogger treeControllerLogger)
            : base(antiforgery, maxHeapService, treeControllerLogger)
        {
        }
    }
}
