namespace AnimateDataStructure.Core.DTOs.SaveNodesDTOs
{
    public class SaveAvlTreeDto : AbstractSaveTreeDto, IHasAuthenticatedProperty
    {
        public bool IsAuthenticated { get; set; }
    }
}
