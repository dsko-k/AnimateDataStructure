using System.ComponentModel.DataAnnotations;

namespace AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels
{
    public class AddNodeViewModel
    {
        [Required(ErrorMessage = "Use digits and dot for the fractional part if it necessary")]
        [RegularExpression(@"^-?\d+(\.\d+)?$", ErrorMessage = "Use digits and dot for the fractional part if it necessary")]
        public string InputValue { get; set; }

        public string TempGuid { get; set; }

        public bool IsAuthenticated { get; set; }
    }
}
