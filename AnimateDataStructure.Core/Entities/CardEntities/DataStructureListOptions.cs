namespace AnimateDataStructure.Core.Entities.CardEntities
{
    public class DataStructureListOptions
    {
        public const string SectionName = "DataStructures"; // Static key for Configuration binding in Program.cs

        public List<DataStructureListCard> Cards { get; set; } = new List<DataStructureListCard>(); // Holds the cards read from appsettings.json
    }
}
