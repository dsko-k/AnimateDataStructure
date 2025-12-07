namespace AnimateDataStructure.Core.Interfaces
{
    /// <summary>
    /// Defines a contract for entities that expose a non-composite integer primary key
    /// through a consistent, generic property name.
    /// </summary>
    /// <remarks>
    /// This interface is used to facilitate the creation of polymorphic 
    /// expression trees (in Entity Framework Core OrderBy clauses) 
    /// where the underlying database column name varies by concrete type 
    /// (e.g., NodeRedBlackTreeId, NodeAvlTreeId).
    /// </remarks>
    public interface IHasPrimaryKeyId
    {
        /// <summary>
        /// Gets the unique integer identifier for the entity
        /// </summary>
        int PrimaryKeyId { get; }
    }
}
