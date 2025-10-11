using AnimateDataStructure.Core.Entities;
using AnimateDataStructure.Infrastructure.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace AnimateDataStructure.Infrastructure.Identity
{
    public static class IdentityConfiguration
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 8;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredUniqueChars = 0;

                // Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
                options.Lockout.MaxFailedAccessAttempts = 8;
                options.Lockout.AllowedForNewUsers = true;

                // User settings.
                options.User.RequireUniqueEmail = true;

                // No confirmed email before sign in to account
                options.SignIn.RequireConfirmedAccount = false;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            return services;
        }


        /// <summary>
        /// Configures the ASP.NET Core Identity application cookie based on the current hosting environment
        /// </summary>
        /// <remarks>
        /// This method applies environment-specific settings to the authentication cookie to optimize for both development and production.
        /// In a development environment, a short-lived, non-sliding cookie is used to ensure a fresh session upon each application restart.
        /// In a production environment, a long-lived, sliding cookie is configured for a better user experience,
        /// allowing users to remain authenticated across multiple browser sessions
        /// </remarks>
        /// <param name="services">The <see cref="IServiceCollection"/> to add the service to</param>
        /// <param name="env">The <see cref="IHostEnvironment"/> to determine the current environment</param>
        /// <returns>The <see cref="IServiceCollection"/> so that additional calls can be chained</returns>

        public static IServiceCollection ConfigureIdentityCookies(this IServiceCollection services, IHostEnvironment env)
        {
            services.ConfigureApplicationCookie(options =>
            {
                if (env.IsDevelopment())
                {
                    // Development settings
                    options.ExpireTimeSpan = TimeSpan.FromHours(5);
                    options.SlidingExpiration = true;
                }
                else
                {
                    // Production settings
                    options.ExpireTimeSpan = TimeSpan.FromDays(30);
                    options.SlidingExpiration = true;
                }

                options.LoginPath = "/Account/Login";
                options.AccessDeniedPath = "/Account/AccessDenied";
            });

            return services;
        }
    }
}
