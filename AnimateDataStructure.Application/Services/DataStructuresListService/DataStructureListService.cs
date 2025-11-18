using AnimateDataStructure.Core.Entities.CardEntities;
using Microsoft.Extensions.Options;

namespace AnimateDataStructure.Application.Services.DataStructuresListService
{
    // Implementation uses Dependency Injection (IOptions) to get data
    public class DataStructureListService : IDataStructureListService
    {
        private readonly List<DataStructureListCard> _cards;

        // Data is injected via IOptions<DataStructureOptions>
        public DataStructureListService(IOptions<DataStructureListOptions> options)
        {
            // Read the data from the bound options object
            _cards = options.Value.Cards;
        }

        public Task<List<DataStructureListCard>> GetAvailableDataStructuresAsync()
        {
            // Return the data without any hardcoding inside the method
            return Task.FromResult(_cards);
        }
    }
}
