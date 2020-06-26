using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
/// <summary>
///     Iterator
///     Let's you travers elemets of a collection selecting them with a criteria.
///     For one type of selecting there exist one class.
///     N.B. For simple logic in C# it is often more comfortable to do it with the help of LINQ and lambda expressions 
/// </summary>

namespace Iterator
{
    abstract class Iterator : IEnumerable
    {
        public List<int> Data { get; set; }
        public virtual IEnumerator GetEnumerator() => null;
    }

    class EvenIterator : Iterator
    {
        public override IEnumerator GetEnumerator() => new CustomEnumerator(Data, x => x % 2 == 0);
    }

    class OddIterator : Iterator
    {
        public override IEnumerator GetEnumerator() => new CustomEnumerator(Data, x => x % 2 != 0);
    }

    public class CustomEnumerator : IEnumerator
    {
        private readonly List<int> data;
        private readonly Func<int, bool> condition;

        private int currentIdx = -1;
        public CustomEnumerator(List<int> data, Func<int, bool> condition)
        {
            this.data = data;
            this.condition = condition;
        }
        public object Current => data[currentIdx];

        public bool MoveNext()
        {
            for (int i = currentIdx + 1; i < data.Count; i++)
            {
                if (condition(data[i]))
                {
                    currentIdx = i;
                    return true;
                }
            }
            return false;
        }

        public void Reset()
        {
            currentIdx = 0;
        }
    }

    class Program
    {
        static void Main(string[] _)
        {
            var data = Enumerable.Range(1, 10).ToList();
            var evenIterator = new EvenIterator { Data = data };
            var oddIterator   = new OddIterator { Data = data };

            foreach (var item in evenIterator)
                Console.WriteLine(item);
            
            Console.WriteLine("----");
            
            foreach (var item in oddIterator)
                Console.WriteLine(item);
        }
    }
}
