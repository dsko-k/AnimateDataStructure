using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Core.Entities.DataStructureEntities
{
    public class MinHeap : IDataStructure<NodeMinHeap>, IHasUserId
    {
        public int MinHeapId { get; set; } // Primary key

        public Guid TempGuid { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual ICollection<NodeMinHeap> Nodes { get; set; } = new List<NodeMinHeap>();

        public string UserId { get; set; } // Foreign key to ApplicationUser

        public virtual ApplicationUser User { get; set; } // Navigational property to ApplicationUser
    }
}
