using AnimateDataStructure.Application.Services.DataStructuresListService;
using Microsoft.AspNetCore.Mvc;

namespace AnimateDataStructure.Web.Controllers
{
    public class DataStructuresController : Controller
    {
        private readonly IDataStructureListService dataStructureService;

        public DataStructuresController(IDataStructureListService dataStructureService)
        {
            this.dataStructureService = dataStructureService;
        }

        public async Task<IActionResult> ShowListDataStructures()
        {
            var cards = await dataStructureService.GetAvailableDataStructuresAsync();

            return View(cards);
        }
    }
}
