using Microsoft.AspNetCore.Mvc;

namespace AnimateDataStructure.Web.Controllers
{
    public class DataStructuresController : Controller
    {
        public async Task<IActionResult> ShowListDataStructures()
        {
            return View();
        }
    }
}
