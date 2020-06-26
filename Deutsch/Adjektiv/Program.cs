using System;

#pragma warning disable IDE0060
namespace Adjektiv
{
    class Program
    {
        static void Main(string[] arg)
        {
            for (; ; )
            {
                Console.Clear();
                var task = new Task();
                task.PrintQuestion();
                Console.Write("Antwort: ");
                task.PrintAnswer(Console.ReadLine());
                Console.ReadLine();
            }
        }
    }
}
