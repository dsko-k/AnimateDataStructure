
namespace AnimateDataStructure.Core.Interfaces
{
    public interface IHasUserId
    {
        /// <summary>
        /// Foreign key for the user who owns this data structure.
        /// Used for authorization and data retrieval.
        /// </summary>
        public string UserId { get; set; }
    }
}
