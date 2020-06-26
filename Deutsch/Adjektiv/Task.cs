using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adjektiv
{
    class Task
    {
#pragma warning disable IDE1006
        private ArticleType articleType { get; set; }
        private Case _case { get; set; }
        private Gender gender { get; set; }

        private string prep { get; set; }
        private string article { get; set; }
        private string adjective { get; set; }
        private string ending { get; set; }
        private string noun { get; set; }
#pragma warning restore IDE1006

        public Task()
        {
            var rnd = Randomizer.getInstance();
            articleType = (ArticleType)rnd.Next(Enum.GetNames(typeof(ArticleType)).Length);
            _case = (Case)rnd.Next(Enum.GetNames(typeof(Case)).Length);
            gender = (Gender)rnd.Next(Enum.GetNames(typeof(Gender)).Length);

            prep = Preposition.Get(_case);
            article = Article.Get(articleType, _case, gender);
            adjective = Adjective.Get();
            ending = Ending.Get(articleType, _case, gender);
            noun = Noun.Get(gender);
        }

        public void PrintQuestion()
        {
            string output = prep + " " + article + " " + adjective + "[..] " + noun;
            output = output.Trim().Replace("  ", " ");
            Console.WriteLine(output);
        }

        public void PrintAnswer(string answer)
        {
            Console.WriteLine();
            Console.WriteLine("Typ " + articleType.GetDescription());
            Console.WriteLine("Kasus: " + _case.GetDescription());
            Console.WriteLine(gender.GetDescription());
            Console.WriteLine();

            string output = prep + " " + article + " " + adjective;
            output = output.Trim().Replace("  ", " ");
            Console.Write(output);
            var color = Console.ForegroundColor;
            Console.ForegroundColor = (answer.ToLower().Trim() == ending) ? ConsoleColor.Green : ConsoleColor.Red;
            Console.Write(ending);
            Console.ForegroundColor = color;
            Console.WriteLine(" " + noun);
        }
    }
}
