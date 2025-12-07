namespace AnimateDataStructure.Core.DTOs.SaveNodesDTOs
{
    public class SaveMinHeapDto : AbstractSaveTreeDto, IHasAuthenticatedProperty
    {
        public bool IsAuthenticated { get; set; }
    }
}
