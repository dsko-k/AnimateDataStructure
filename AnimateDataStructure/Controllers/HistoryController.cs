using Microsoft.AspNetCore.Mvc;

namespace AnimateDataStructure.Web.Controllers
{
    public class HistoryController : Controller
    {
        public async Task<IActionResult> SavedDataStructures()
        {
            return View();
        }
    }
}
