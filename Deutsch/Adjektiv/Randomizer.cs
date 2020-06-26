using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adjektiv
{
    public class Randomizer : Random
    {
        private static Randomizer instance;
        public static Randomizer getInstance()
        {
            if (instance == null)
                instance = new Randomizer();
            return instance;
        }
    }
}
