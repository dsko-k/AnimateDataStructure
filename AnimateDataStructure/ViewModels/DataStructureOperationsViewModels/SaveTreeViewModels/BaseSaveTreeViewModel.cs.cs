using System.ComponentModel.DataAnnotations;

namespace AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels
{
    public class BaseSaveTreeViewModel
    {
        //[RegularExpression(@"^$|^[0-9]+(\.[0-9]+)?(,[0-9]+(\.[0-9]+)?)*$", ErrorMessage = "Invalid format. It must be a comma-separated list of numbers. Fraction part is separeted with a dot")]
        [RegularExpression(@"^$|^-?[0-9]+(\.[0-9]+)?(,-?[0-9]+(\.[0-9]+)?)*$", ErrorMessage = "Invalid format. It must be a comma-separated list of numbers. The fractional part is separated with a dot")]
        public string InputValue { get; set; }
        
        


        [RegularExpression(@"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", ErrorMessage = "TempGuid must be in GUID format")]
        public string TempGuid { get; set; }
    }
}
