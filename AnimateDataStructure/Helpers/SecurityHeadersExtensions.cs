using AnimateDataStructure.Web.Middleware;

namespace AnimateDataStructure.Web.Helpers
{
    // Extension method to allow calling the middleware easily from Program.cs
    public static class SecurityHeadersExtensions
    {
        public static IApplicationBuilder UseSecurityHeaders(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SecurityHeadersMiddleware>();
        }
    }
}
