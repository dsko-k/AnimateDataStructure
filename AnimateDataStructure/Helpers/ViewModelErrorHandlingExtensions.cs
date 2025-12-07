using AnimateDataStructure.Core.Results;
using AnimateDataStructure.Core.ValidationErrors;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace AnimateDataStructure.Web.Helpers
{
    public static class ViewModelErrorHandlingExtensions
    {
        private static readonly Dictionary<string, string> ErrorToPropertyMap = new()
        {
            {ValidationErrorKeys.DuplicateValues, "InputValue"  },
            {ValidationErrorKeys.ExistingValue, "InputValue"  },
            {ValidationErrorKeys.UserNotFound, string.Empty },
            {ValidationErrorKeys.UnexpectedError, string.Empty },
            {ValidationErrorKeys.BSTViolation, "InputValue" },
            {ValidationErrorKeys.AVLBalanceViolation, "InputValue" },
            {ValidationErrorKeys.MaxHeapViolation, "InputValue" },
            {ValidationErrorKeys.MinHeapViolation, "InputValue" },
            {ValidationErrorKeys.RBTRedRootViolation, "InputValue" },
            {ValidationErrorKeys.RBTRedNodeHasRedChildViolation, "InputValue" }
        };

        public static void AddServiceResultErrorsToModelState(this ModelStateDictionary modelState, ServiceResult result)
        {
            if (result.ErrorKey != null && ErrorToPropertyMap.TryGetValue(result.ErrorKey, out string mappedPropertyName))
            {
                modelState.AddModelError(mappedPropertyName, result.ErrorMessage);
            }
            else
            {
                // Fallback for truly unhandled errors
                modelState.AddModelError(string.Empty, ValidationErrorMessages.ErrorMap[ValidationErrorKeys.UnexpectedError]);
            }
        }
    }
}
