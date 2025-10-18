using AnimateDataStructure.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly ApplicationDbContext context;
        private readonly DbSet<T> dbSet;


        public GenericRepository(ApplicationDbContext context)
        {
            this.context = context;
            dbSet = this.context.Set<T>();
        }


        public async Task<T?> GetByIdAsync(int id) => await dbSet.FindAsync(id);


        public async Task<T?> GetByTempGuidAsync(Guid tempGuid, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = dbSet;

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.FirstOrDefaultAsync(e => EF.Property<Guid>(e, "TempGuid") == tempGuid);
        }


        public async Task<IEnumerable<T>> GetAllAsync() => await dbSet.ToListAsync();


        public async Task<IEnumerable<T>> GetAllFilteredAsync(Expression<Func<T, bool>> predicate)
        {
            IQueryable<T> query = dbSet.Where(predicate);

            return await query.ToListAsync();
        }


        public async Task AddAsync(T entity) => await dbSet.AddAsync(entity);


        public Task UpdateAsync(T entity)
        {
            dbSet.Update(entity);
            return Task.CompletedTask;
        }


        public Task DeleteAsync(T entity)
        {
            dbSet.Remove(entity);
            return Task.CompletedTask;
        }


        public async Task<int> SaveChangesAsync() => await context.SaveChangesAsync();
    }
}
