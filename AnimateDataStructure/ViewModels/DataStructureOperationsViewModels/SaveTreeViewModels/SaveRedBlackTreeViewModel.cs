using System.ComponentModel.DataAnnotations;
using AnimateDataStructure.Application.DTOs.SaveNodesDTOs;

namespace AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels
{
    public class SaveRedBlackTreeViewModel : BaseSaveTreeViewModel, IHasAuthenticatedProperty
    {
        [RegularExpression(@"^$|^-?[0-9]+(\.[0-9]+)?,(true|false)(,-?[0-9]+(\.[0-9]+)?,(true|false))*$",
    ErrorMessage = "Invalid format. It must be a comma-separated list of number-boolean pairs. The fractional part is separated with a dot")]
        public new string InputValue { get; set; }
        
        public new string TempGuid { get; set; }

        public bool IsAuthenticated { get; set; }
    }
}
