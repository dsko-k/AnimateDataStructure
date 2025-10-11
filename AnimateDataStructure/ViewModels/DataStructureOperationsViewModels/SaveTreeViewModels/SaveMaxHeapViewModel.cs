using AnimateDataStructure.Application.DTOs.SaveNodesDTOs;

namespace AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels
{
    public class SaveMaxHeapViewModel : BaseSaveTreeViewModel, IHasAuthenticatedProperty
    {
        public bool IsAuthenticated { get; set; }
    }
}
