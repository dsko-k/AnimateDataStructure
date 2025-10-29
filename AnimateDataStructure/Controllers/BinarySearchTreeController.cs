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
