using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Services.LoggingService;
using AnimateDataStructure.Core.Services.TreeServices;
using AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels;
using Microsoft.AspNetCore.Antiforgery;

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
