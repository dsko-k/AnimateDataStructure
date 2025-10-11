using System.ComponentModel.DataAnnotations;

namespace AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels
{
    public class TraverseNodesViewModel
    {
        private string inputValue;

        [RegularExpression(@"^$|^\d+(\.\d+)?$",
        ErrorMessage = "Use an empty string for traversing all nodes. Specify a node value for conditional traversing (use digits and a dot for the fractional part if it is necessary)")]
        public string InputValue
        {
            get => inputValue; // The getter simply returns the value of the backing field.
            set
            {
                // The setter performs the logic. If the incoming value is null,
                // we set the backing field to an empty string instead
                inputValue = value ?? "";
            }
        }

        public string TempGuid { get; set; }

        public bool IsAuthenticated { get; set; }
    }
}
