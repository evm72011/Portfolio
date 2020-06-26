using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adjektiv
{
    public static class Ending
    {
        private static readonly string[,,] ending;
        static Ending()
        {
            ending = new string[,,]
            {
                {{  "e", "e",  "e",  "en"},
                 { "en", "e",  "e",  "en"},
                 { "en", "en", "en", "en"},
                 { "en", "en", "en", "en"}},

                {{ "er", "es",  "e",  "e"},
                 { "en", "es",  "e",  "e"},
                 { "en", "en", "en", "en"},
                 { "en", "en", "en", "er"}},

                {{ "er", "es",  "e",  "e"},
                 { "en", "es",  "e",  "e"},
                 { "em", "em", "er", "en"},
                 { "en", "en", "er", "er"}}
            };
        }

        public static string Get(ArticleType t, Case k, Gender g)
        {
            return ending[(int)t, (int)k, (int)g];
        }
    }
}
