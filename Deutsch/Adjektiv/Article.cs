using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adjektiv
{
    public static class Article
    {
        private static readonly string[,,] artikel;
        static Article()
        {
            artikel = new string[,,]
            {
                {{ "der", "das", "die", "die"},
                 { "den", "das", "die", "die"},
                 { "dem", "dem", "der", "den"},
                 { "des", "des", "der", "der"}},

                {{ "ein",   "ein",   "eine",  ""},
                 { "einen", "ein",   "eine",  ""},
                 { "einem", "einem", "einer", ""},
                 { "eines", "eines", "einer", ""}}
            };
        }

        public static string Get(ArticleType t, Case k, Gender g)
        {
            if (t == ArticleType.Emty)
                return "";
            else
                return artikel[(int)t, (int)k, (int)g];
        }
    }
}
