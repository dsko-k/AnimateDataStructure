using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;

namespace AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels
{
    public class SaveAvlTreeViewModel : BaseSaveTreeViewModel, IHasAuthenticatedProperty
    {
        public bool IsAuthenticated { get; set; }
    }
}
