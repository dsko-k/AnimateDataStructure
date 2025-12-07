namespace AnimateDataStructure.Core.DTOs.SaveNodesDTOs
{
    public class SaveMaxHeapDto : AbstractSaveTreeDto, IHasAuthenticatedProperty
    {
        public bool IsAuthenticated { get; set; }
    }
}
