using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels
{
    public class TraverseNodesViewModel
    {
        private string inputValue;

        [RegularExpression(@"^$|^\d+(\.\d+)?$",
        ErrorMessage = "Use an empty string for traversing all nodes. Specify a node value for conditional traversing (use digits and a dot for the fractional part if it is necessary)")]
        public string InputValue
        {
            get => inputValue;
            set
            {
                inputValue = value ?? "";
            }
        }

        public string TempGuid { get; set; }

        public bool IsAuthenticated { get; set; }
    }
}
