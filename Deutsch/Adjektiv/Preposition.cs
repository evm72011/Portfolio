using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adjektiv
{
    static class Preposition
    {
        private static readonly string[] prepN;
        private static readonly string[] prepA;
        private static readonly string[] prepD;
        private static readonly string[] prepG;
        
        static Preposition()
        {
            prepN = new string[] { "" };
            prepA = new string[] { "dürch", "für", "ohne", "bis", "um", "gegen" };
            prepD = new string[] { "mit", "nach", "aus", "zu", "von", "bei", "seit", "außer", "gegenüber" };
            prepG = new string[] { "wegen", "während", "trotz", "statt" };
        }

        public static string Get(Case k)
        {
            switch (k)
            {
                case Case.Nom:
                    return prepN.GetRandom();
                case Case.Akk:
                    return prepA.GetRandom();
                case Case.Dat:
                    return prepD.GetRandom();
                case Case.Gen:
                    return prepG.GetRandom();
                default:
                    throw new ArgumentException();
            }
        }
    }
}
