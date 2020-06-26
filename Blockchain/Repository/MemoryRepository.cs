using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Repository
{
    public class MemoryRepository<T> : IRepository<T> where T : IEntity
    {
        private static MemoryRepository<T> instance;
        private readonly List<T> data = new List<T>();

        public static MemoryRepository<T> GetInstance()
        {
            if (instance is null)
                instance = new MemoryRepository<T>();
            return instance;
        }

        public void Add(T obj)
        {
            if (data.Count == 0)
                obj.Id = 0;
            else
                obj.Id = data.Select(x => x.Id).Max() + 1;
            data.Add(obj);
        }

        public List<T> Items
        {
            get => data;
        }
    }
}
