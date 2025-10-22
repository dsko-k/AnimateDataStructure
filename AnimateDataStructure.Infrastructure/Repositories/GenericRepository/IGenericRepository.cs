using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Infrastructure.Repositories.GenericRepository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(int id);

        //Task<T?> GetByTempGuidAsync(Guid tempGuid);
        Task<T?> GetByTempGuidAsync(Guid tempGuid, params Expression<Func<T, object>>[] includes);

        Task<IEnumerable<T>> GetAllAsync();

        Task<IEnumerable<T>> GetAllFilteredAsync(Expression<Func<T, bool>> predicate);

        Task AddAsync(T entity);

        Task UpdateAsync(T entity);

        Task DeleteAsync(T entity);

        Task<int> SaveChangesAsync();
    }
}
