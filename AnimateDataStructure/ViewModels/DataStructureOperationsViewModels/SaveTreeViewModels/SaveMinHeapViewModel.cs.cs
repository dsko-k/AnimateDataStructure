using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;

namespace AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels
{
    public class SaveMinHeapNodesViewModel : BaseSaveTreeViewModel, IHasAuthenticatedProperty
    {
        public bool IsAuthenticated { get; set; }
    }
}
