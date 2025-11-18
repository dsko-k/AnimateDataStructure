using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Entities.CardEntities
{
    public class DataStructureListOptions
    {
        // Static key for Configuration binding in Program.cs
        public const string SectionName = "DataStructures";

        // Holds the cards read from appsettings.json
        public List<DataStructureListCard> Cards { get; set; } = new List<DataStructureListCard>();
    }
}
