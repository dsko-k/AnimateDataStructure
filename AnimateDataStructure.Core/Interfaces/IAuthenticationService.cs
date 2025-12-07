using Microsoft.AspNetCore.Identity;

namespace AnimateDataStructure.Core.Interfaces
{
    public interface IAuthenticationService
    {
        // Returns SignInResult to expose login errors
        Task<SignInResult> LoginAsync(string email, string password, bool rememberMe);

        Task<IdentityResult> RegisterAsync(string email, string password, string? userName);

        Task LogoutAsync();
    }
}
