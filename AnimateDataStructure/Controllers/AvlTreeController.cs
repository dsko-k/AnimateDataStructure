using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Services.LoggingService;
using AnimateDataStructure.Core.Services.TreeServices;
using AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels;
using Microsoft.AspNetCore.Antiforgery;

namespace AnimateDataStructure.Web.Controllers
{
    public class AvlTreeController : BaseTreeController<AvlTreeService, SaveAvlTreeViewModel, SaveAvlTreeDto>
    {
        public AvlTreeController(IAntiforgery antiforgery, 
                                 AvlTreeService avlTreeService,
                                 ITreeControllerLogger treeControllerLogger)
            : base(antiforgery, avlTreeService, treeControllerLogger)
        {
        }
    }
}
