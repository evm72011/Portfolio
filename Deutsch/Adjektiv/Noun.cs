using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adjektiv
{
    class Noun
    {
        private static readonly string[] nounM;
        private static readonly string[] nounF;
        private static readonly string[] nounN;
        private static readonly string[] nounP;

        static Noun()
        {
            nounM = new string[] { "Löffel", "Hund", "Schrank", "Tisch", "Stuhl", "Herd", "Computer" }; ;
            nounF = new string[] { "Gabel", "Katze", "Seite", "Tasche", "Wand", "Tasse", "Auge", "Lippe" };
            nounN = new string[] { "Messer", "Mädchen", "Kind", "Buch", "Wort", "Handy", "Büro", "Fenster" };
            nounP = new string[] { "Tassen", "Kinder", "Bücher", "Wörter", "Augen", "Lampen" };
        }

        public static string Get(Gender g)
        {
            switch (g)
            {
                case Gender.M:
                    return nounM.GetRandom();
                case Gender.F:
                    return nounF.GetRandom();
                case Gender.N:
                    return nounN.GetRandom();
                case Gender.P:
                    return nounP.GetRandom();
                default:
                    throw new ArgumentException();
            }
        }

    }
}
