using Microsoft.AspNetCore.Identity;

namespace AnimateDataStructure.Core.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime? DateOfBirth { get; set; }
    }
}
