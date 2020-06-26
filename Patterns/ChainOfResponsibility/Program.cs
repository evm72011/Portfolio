using System;
using System.Collections.Generic;
/// <summary>
///     Chain of Responsibility
///     Allows to perform a chain of verifications for some conditions.
///     Element in chain can interact each other directly or via separate class
///     
///     The example emulate work of consultation service.
///     Voice Mail -> Hot Line -> Specialist (high skilled consultatnt)
/// </summary>
namespace ChainOfResponsibility
{
    interface IHelper
    {
        public bool GetAnswer(string question);
    }

    class VoiceMail : IHelper
    {
        public bool GetAnswer(string question)
        {
            if (question.Length % 2 == 0)
            {
                Console.WriteLine("Voice mail: answer to your question");
                return true;
            }
            else
            {
                Console.WriteLine("Voice mail: I don't know");
                return false;
            }
        }
    }

    class HotLine : IHelper
    {
        public bool GetAnswer(string question)
        {
            if (question.Length < 15)
            {
                Console.WriteLine("Hot line: answer to your question");
                return true;
            }
            else
            {
                Console.WriteLine("Hot line: I don't know");
                return false;
            }
        }
    }

    class Specialist : IHelper
    {
        public bool GetAnswer(string question)
        {
            Console.WriteLine("Specialist: answer to your question");
            return true;
        }
    }

    class HelpSystem
    {
        private List<IHelper> helpers = new List<IHelper> { new VoiceMail(), new HotLine(), new Specialist() };
        public void GetAnswer(string question)
        {
            Console.WriteLine("Your question: " + question);
            foreach (var helper in helpers)
            {
                if (helper.GetAnswer(question)) 
                    break;
            }
        }
    }
    class Program
    {
        static void Main(string[] _)
        {
            var helpSystem = new HelpSystem();
            helpSystem.GetAnswer("My question #1");
            Console.WriteLine();

            helpSystem.GetAnswer("My question 2");
            Console.WriteLine();

            helpSystem.GetAnswer("My question 1 000 000");
            Console.WriteLine();
        }
    }
}
