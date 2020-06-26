using System;
using System.Collections.Generic;
using System.Text;

namespace Systemhaus
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