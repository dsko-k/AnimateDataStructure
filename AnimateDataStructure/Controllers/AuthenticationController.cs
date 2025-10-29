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
        private readonly IAuthenticationService authenticationService;
        private readonly ILogger<AuthenticationController> logger;

        public AuthenticationController(IAuthenticationService authenticationService, ILogger<AuthenticationController> logger)
        {
            this.authenticationService = authenticationService;
            this.logger = logger;
        }


        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Register([FromBody] RegisterViewModel registerViewModel)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var result = await authenticationService.RegisterAsync(registerViewModel.Email, registerViewModel.Password, registerViewModel.UserName);

        //        if (result.Succeeded)
        //        {
        //            logger.LogInformation("User {Email} registered successfully", registerViewModel.Email);
        //            return Json(new { success = true });
        //        }
        //        else
        //        {
        //            // Use your existing extension method to handle errors
        //            ModelState.AddRegistrationFormErrorsToModelState(result.Errors, typeof(RegisterViewModel));
        //            return BadRequest(ModelState);
        //        }
        //    }

        //    return BadRequest(ModelState);
        //}


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel registerViewModel)
        {
            if (ModelState.IsValid)
            {
                var result = await authenticationService.RegisterAsync(registerViewModel.Email, registerViewModel.Password, registerViewModel.UserName);

                if (result.Succeeded)
                {
                    // Offload the synchronous logger call to prevent deadlock
                    _ = Task.Run(() =>
                    {
                        logger.LogInformation("User {Email} registered successfully", registerViewModel.Email);
                    });

                    return Json(new { success = true });
                }
                else
                {
                    ModelState.AddRegistrationFormErrorsToModelState(result.Errors, typeof(RegisterViewModel));
                    return BadRequest(ModelState);
                }
            }

            return BadRequest(ModelState);
        }


        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Login([FromBody] LoginViewModel loginViewModel)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        logger.LogWarning("Login attempt failed due to invalid ModelState for user {Email}", loginViewModel.Email);
        //        return BadRequest(ModelState);
        //    }

        //    // Pass the login details to the Authentication Service
        //    var result = await authenticationService.LoginAsync(loginViewModel.Email, loginViewModel.Password, loginViewModel.RememberMe);

        //    // Check if the login was successful
        //    if (result.Succeeded)
        //    {
        //        logger.LogInformation("User {Email} logged in", loginViewModel.Email);

        //        _ = Task.Run(() =>
        //        {
        //            logger.LogInformation("User {Email} logged in", loginViewModel.Email);
        //        });
        //        return Json(new { success = true });
        //    }
        //    else
        //    {
        //        logger.LogWarning("Login failed for user {Email}", loginViewModel.Email);
        //        ModelState.AddLoginFormErrorsToModelState(result, typeof(LoginViewModel));
        //        return BadRequest(ModelState);
        //    }
        //}


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginViewModel)
        {
            // Offload synchronous logger call
            if (!ModelState.IsValid)
            {
                _ = Task.Run(() =>
                {
                    logger.LogWarning("Login attempt failed due to invalid ModelState for user {Email}", loginViewModel.Email);
                });

                return BadRequest(ModelState);
            }

            var result = await authenticationService.LoginAsync(loginViewModel.Email, loginViewModel.Password, loginViewModel.RememberMe);

            if (result.Succeeded)
            {
                _ = Task.Run(() =>
                {
                    logger.LogInformation("User {Email} logged in", loginViewModel.Email);
                });

                return Json(new { success = true });
            }
            else
            {
                // Offload synchronous logger call
                _ = Task.Run(() =>
                {
                    logger.LogWarning("Login failed for user {Email}", loginViewModel.Email);
                });

                ModelState.AddLoginFormErrorsToModelState(result, typeof(LoginViewModel));
                return BadRequest(ModelState);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            // Call the service method to handle the logout logic
            await authenticationService.LogoutAsync();

            return RedirectToAction(actionName: nameof(DataStructuresController.ShowListDataStructures),
                controllerName: nameof(DataStructuresController).Replace("Controller", ""));
        }


        [HttpGet]
        public IActionResult Authenticate()
        {
            // This is purely for the UI, so no service is needed
            return PartialView("_AuthModalPartial");
        }

    }
}
