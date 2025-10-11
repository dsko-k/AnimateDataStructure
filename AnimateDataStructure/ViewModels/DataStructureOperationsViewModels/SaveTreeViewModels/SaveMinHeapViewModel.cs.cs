using AnimateDataStructure.Application.DTOs.SaveNodesDTOs;

namespace AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels
{
    public class SaveMinHeapNodesViewModel : BaseSaveTreeViewModel, IHasAuthenticatedProperty
    {
        public bool IsAuthenticated { get; set; }
    }
}
