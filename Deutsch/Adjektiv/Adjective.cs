using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adjektiv
{
    public static class Adjective
    {
        private static readonly string[] adjektive;
        static Adjective()
        {
            adjektive = new string[] { "klein", "groß", "alt", "neu", "lang", "kurz", "hall", "sauber" };
        }

        public static string Get()
        {
            return adjektive.GetRandom();
        }
    }
}
