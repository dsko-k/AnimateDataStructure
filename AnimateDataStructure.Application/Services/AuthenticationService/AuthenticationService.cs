using AnimateDataStructure.Core.Entities;
using AnimateDataStructure.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Services.AuthenticationService
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;


        public AuthenticationService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }


        public async Task<IdentityResult> RegisterAsync(string email, string password, string? userName)
        {
            var user = new ApplicationUser
            {
                Email = email,
                UserName = string.IsNullOrWhiteSpace(userName) ? email : userName
            };

            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
            }

            // Return the result directly to the controller
            return result;
        }


        public async Task<SignInResult> LoginAsync(string email, string password, bool rememberMe)
        {
            var user = await _userManager.FindByEmailAsync(email);

            // A null user is a specific case that SignInManager does not handle.
            // Return a failed result so the controller can handle it.
            if (user == null)
            {
                return SignInResult.Failed;
            }

            var result = await _signInManager.PasswordSignInAsync(user, password, rememberMe, lockoutOnFailure: true);

            return result;
        }



        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
