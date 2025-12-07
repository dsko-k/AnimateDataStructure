namespace AnimateDataStructure.Core.DTOs.SaveNodesDTOs
{
    public class SaveBinarySearchTreeDto : AbstractSaveTreeDto, IHasAuthenticatedProperty
    {
        public bool IsAuthenticated { get; set; }
    }
}
