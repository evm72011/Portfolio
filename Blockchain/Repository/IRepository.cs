using System;
using System.Collections.Generic;

namespace Repository
{
    public interface IRepository<T>
    {
        public void Add(T obj);
        public List<T> Items { get; }
    }
}
