using AnimateDataStructure.Application.DTOs;
using AnimateDataStructure.Application.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Application.Services.LoggingService;
using AnimateDataStructure.Application.Services.TreeServices;
using AnimateDataStructure.Web.Helpers;
using AnimateDataStructure.Web.Mapper;
using AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels;
using AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
