namespace AnimateDataStructure.Core.Entities.SecurityHeaders
{
    public class SecurityHeaderOptions
    {
        // Configuration section name
        public const string SectionName = "SecurityHeaders";

        // Header Names (Constants)
        public const string XFrameOptionsHeader = "X-Frame-Options";
        public const string XContentTypeOptionsHeader = "X-Content-Type-Options";
        public const string ReferrerPolicyHeader = "Referrer-Policy";
        public const string ContentSecurityPolicyHeader = "Content-Security-Policy";
        public const string HstsPolicyHeader = "Strict-Transport-Security";

        // Header Values (properties bound from appsettings.json)

        // Content Security Policy (Environment dependent via appsettings.Development.json)
        public string ContentSecurityPolicy { get; set; } = string.Empty;

        // X-Frame-Options
        public string XFrameOptionsPolicy { get; set; } = string.Empty;

        // X-Content-Type-Options
        public string XContentTypeOptionsPolicy { get; set; } = string.Empty;

        // Referrer-Policy
        public string ReferrerPolicy { get; set; } = string.Empty;

        // Strict-Transport-Security (HSTS)
        public string HstsPolicy { get; set; } = string.Empty;
    }
}
