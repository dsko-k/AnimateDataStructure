namespace AnimateDataStructure.Core.DTOs.SaveNodesDTOs
{
    public class SaveRedBlackTreeDto : AbstractSaveTreeDto, IHasAuthenticatedProperty
    {
        public bool IsAuthenticated { get; set; }
    }
}
