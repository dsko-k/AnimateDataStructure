using AnimateDataStructure.Application.DTOs.HistoryDataStructureDTOs;
using AnimateDataStructure.Infrastructure.Repositories;


namespace AnimateDataStructure.Application.Services.HistoryService
{
    public class HistoryService : IHistoryService
    {
        private readonly IGenericRepository<HistoryDataStructureDto> repository;


        public HistoryService(IGenericRepository<HistoryDataStructureDto> repository)
        {
            this.repository = repository;
        }


        public async Task<IEnumerable<HistoryDataStructureDto>> GetSavedDataStructuresForUserAsync(string userId)
        {
            var allEntities = await repository.GetAllFilteredAsync(s => s.UserId == userId);

            // 2. Map the entities to DTOs for the view (e.g., using AutoMapper).
            // DTOs ensure you don't expose unnecessary data and keep the view model clean
            var dtos = allEntities.Select(entity => new HistoryDataStructureDto
            {
                Id = entity.Id,
                UserId = entity.UserId,
                Type = entity.Type,
                DateSaved = entity.DateSaved,
                DateModified = entity.DateModified,
                NodeData = entity.NodeData                
                
            }).ToList();

            return dtos;
        }
    }
}
