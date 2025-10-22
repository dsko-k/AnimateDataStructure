using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;

namespace AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels
{
    public class SaveBinarySearchTreeViewModel : BaseSaveTreeViewModel, IHasAuthenticatedProperty
    {
        public bool IsAuthenticated { get; set; }
    }
}
