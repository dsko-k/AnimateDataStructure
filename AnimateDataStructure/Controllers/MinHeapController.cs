using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Services.LoggingService;
using AnimateDataStructure.Core.Services.TreeServices;
using AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels;
using Microsoft.AspNetCore.Antiforgery;

namespace AnimateDataStructure.Web.Controllers
{
    public class MinHeapController : BaseTreeController<MinHeapService, SaveMinHeapNodesViewModel, SaveMinHeapDto>
    {
        public MinHeapController(IAntiforgery antiforgery, 
                                 MinHeapService minHeapService,
                                 ITreeControllerLogger treeControllerLogger)
            : base(antiforgery, minHeapService, treeControllerLogger)
        {
        }
    }
}
