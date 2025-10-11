using AnimateDataStructure.Core.Interfaces;
using AnimateDataStructure.Web.ViewModels;
using AnimateDataStructure.Web.ViewModels.AuthenticationViewModels;
using AnimateDataStructure.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;


namespace AnimateDataStructure.Web.Controllers
{
    public class AuthenticationController : Controller
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(IAuthenticationService authenticationService, ILogger<AuthenticationController> logger)
        {
            _authenticationService = authenticationService;
            _logger = logger;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel registerViewModel)
        {
            if (ModelState.IsValid)
            {
                var result = await _authenticationService.RegisterAsync(registerViewModel.Email, registerViewModel.Password, registerViewModel.UserName);

                if (result.Succeeded)
                {
                    _logger.LogInformation("User registered successfully");
                    return Json(new { success = true });
                }
                else
                {
                    // Use your existing extension method to handle errors
                    ModelState.AddRegistrationFormErrorsToModelState(result.Errors, typeof(RegisterViewModel));
                    return BadRequest(ModelState);
                }
            }

            return BadRequest(ModelState);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Pass the login details to the Authentication Service
            var result = await _authenticationService.LoginAsync(loginViewModel.Email, loginViewModel.Password, loginViewModel.RememberMe);

            // Check if the login was successful
            if (result.Succeeded)
            {
                _logger.LogInformation("User logged in.");
                return Json(new { success = true });
            }
            else
            {
                // Use your existing extension method to handle remaining errors
                // This now correctly handles a non-successful login result
                ModelState.AddLoginFormErrorsToModelState(result, typeof(LoginViewModel));
                return BadRequest(ModelState);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            // Call the service method to handle the logout logic
            await _authenticationService.LogoutAsync();

            // The controller remains responsible for the redirection
            return RedirectToAction("ShowListDataStructures", "DataStructures");
        }


        [HttpGet]
        public IActionResult Authenticate()
        {
            // This is purely for the UI, so no service is needed
            return PartialView("_AuthModalPartial");
        }
    }
}
