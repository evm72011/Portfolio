using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adjektiv
{
    public static class ArrayExtension
    {
        public static T GetRandom<T>(this T[] arr)
        {
            if (arr.Length == 0)
            {
                return default(T);
            }
            else
            {
                var rnd = Randomizer.getInstance();
                return arr[rnd.Next(arr.Length)];
            }
        }
    }
}
