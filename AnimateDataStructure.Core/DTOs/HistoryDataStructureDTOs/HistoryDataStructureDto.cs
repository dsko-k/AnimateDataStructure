using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.DTOs.HistoryDataStructureDTOs
{
    public class HistoryDataStructureDto
    {
        public int Id { get; set; }


        public string UserId { get; set; }


        public Guid TempGuid { get; set; }

        public string DataStructureType { get; set; } // The type of data structure (e.g., "Binary Search Tree", "Max Heap")


        public DateTime UpdatedAt { get; set; } // When the structure was saved


        public DateTime CreatedAt { get; set; } // When the structure was saved


        // Holds the serialized representation of the structure's nodes
        public string NodeData { get; set; }

    }
}
