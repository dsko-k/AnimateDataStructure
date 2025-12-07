using AnimateDataStructure.Core.Entities.SecurityHeaders;
using Microsoft.Extensions.Options;

namespace AnimateDataStructure.Web.Middleware
{
    // Custom middleware class responsible for adding security headers    
    public class SecurityHeadersMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly SecurityHeaderOptions _options; // Store the injected configuration object

        // Inject IOptions<SecurityHeaderOptions> to get all header values from appsettings.json
        public SecurityHeadersMiddleware(RequestDelegate next, IOptions<SecurityHeaderOptions> options)
        {
            _next = next;            
            _options = options.Value; // Store the configuration object
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var headers = context.Response.Headers;
            
            AddHeaderIfNotPresent(headers, SecurityHeaderOptions.XFrameOptionsHeader, _options.XFrameOptionsPolicy); // 1. X-Frame-Options (Uses value from config)            
            AddHeaderIfNotPresent(headers, SecurityHeaderOptions.XContentTypeOptionsHeader, _options.XContentTypeOptionsPolicy); // 2. X-Content-Type-Options            
            AddHeaderIfNotPresent(headers, SecurityHeaderOptions.ReferrerPolicyHeader, _options.ReferrerPolicy); // 3. Referrer-Policy            
            AddHeaderIfNotPresent(headers, SecurityHeaderOptions.ContentSecurityPolicyHeader, _options.ContentSecurityPolicy); // 4. Content Security Policy (CSP) (Uses value from config, which is environment-aware)

            // 5. Strict-Transport-Security (HSTS) (Uses value from config)
            if (context.Request.IsHttps)
            {
                AddHeaderIfNotPresent(headers, SecurityHeaderOptions.HstsPolicyHeader, _options.HstsPolicy);
            }

            await _next(context);
        }

        /// <summary>
        /// Adds a header with the specified value to the response headers if it is not already present.
        /// Uses the indexer to safely set the header, avoiding the ASP0019 warning.
        /// </summary>
        private static void AddHeaderIfNotPresent(IHeaderDictionary headers, string headerName, string headerValue)
        {
            if (!string.IsNullOrEmpty(headerValue) && !headers.ContainsKey(headerName))
            {
                headers[headerName] = headerValue;
            }
        }
    }
}
