using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Reflection;

namespace AnimateDataStructure.Web.Helpers
{
    public static class IdentityErrorHandlingExtensions
    {
        private static readonly Dictionary<string, string> IdentityErrorToPropertyMap = new Dictionary<string, string>
        {
            // Password errors
            { "PasswordTooShort", "Password" },
            { "PasswordRequiresNonAlphanumeric", "Password" },
            { "PasswordRequiresDigit", "Password" },
            { "PasswordRequiresLower", "Password" },
            { "PasswordRequiresUpper", "Password" },
            { "PasswordRequiresUniqueChars", "Password" },
            // User name errors
            { "DuplicateUserName", "UserName" },
            { "InvalidUserName", "UserName" },
            // Email errors
            { "DuplicateEmail", "Email" },
            { "InvalidEmail", "Email" },
        };


        // This dictionary maps a custom login error key to its corresponding
        // ViewModel property and error message.
        private static readonly Dictionary<string, (string PropertyName, string ErrorMessage)> LoginErrorsMap = new Dictionary<string, (string, string)>
        {
            { "LockedOut", ("Email", "Account locked out. Please try again later") },
            { "InvalidPassword", ("Password", "Invalid password") },
            { "UserNotFound", ("Email", "Invalid login attempt") }
        };



        /// <summary>
        /// Adds Identity errors to ModelState, mapping them to specific properties based on known IdentityError.Code values.
        /// Unmapped or invalid property errors are added as general model errors.
        /// </summary>
        /// <param name="modelState">The ModelStateDictionary to add errors to.</param>
        /// <param name="identityResultErrors">The collection of IdentityError objects.</param>
        /// <param name="viewModelType">The type of the ViewModel (e.g., typeof(RegisterViewModel)).</param>
        public static void AddRegistrationFormErrorsToModelState(this ModelStateDictionary modelState,
                                                          IEnumerable<IdentityError> identityResultErrors,
                                                          Type viewModelType)
        {
            // Cache ViewModel property names for efficient lookup, making it case-insensitive.
            var viewModelPropertyNames = new HashSet<string>(
                viewModelType.GetProperties(BindingFlags.Public | BindingFlags.Instance)
                             .Select(p => p.Name),
                StringComparer.OrdinalIgnoreCase
            );

            foreach (var error in identityResultErrors)
            {
                string modelPropertyKey = string.Empty;
                if (IdentityErrorToPropertyMap.TryGetValue(error.Code, out string mappedPropertyName))
                {
                    if (viewModelPropertyNames.Contains(mappedPropertyName))
                    {
                        modelPropertyKey = mappedPropertyName;
                    }
                }
                modelState.AddModelError(modelPropertyKey, error.Description);
            }
        }


        /// <summary>
        /// Adds specific login-related errors to ModelState based on the SignInResult,
        /// using a centralized dictionary for clean mapping and messaging.
        /// </summary>
        /// <param name="modelState">The ModelStateDictionary to add errors to.</param>
        /// <param name="signInResult">The result of the sign-in attempt.</param>
        /// <param name="viewModelType">The type of the ViewModel (e.g., typeof(LoginViewModel)).</param>
        public static void AddLoginFormErrorsToModelState(this ModelStateDictionary modelState,
                                                       SignInResult signInResult,
                                                       Type viewModelType)
        {
            var viewModelPropertyNames = new HashSet<string>(
                viewModelType.GetProperties(BindingFlags.Public | BindingFlags.Instance)
                             .Select(p => p.Name),
                StringComparer.OrdinalIgnoreCase
            );
            string errorKey = "InvalidPassword";
            if (signInResult.IsLockedOut)
            {
                errorKey = "LockedOut";
            }
            // Look up the property name and error message from the dictionary.
            if (LoginErrorsMap.TryGetValue(errorKey, out var errorDetails) && viewModelPropertyNames.Contains(errorDetails.PropertyName))
            {
                // Property was found and exists on the ViewModel.
                modelState.AddModelError(errorDetails.PropertyName, errorDetails.ErrorMessage);
            }
            else
            {
                // Either the key was not found or the property doesn't exist on the ViewModel.
                modelState.AddModelError(string.Empty, "Invalid login attempt");
            }
        }
    }
}
