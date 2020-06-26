using System;
/// <summary>
///     Facade
///     You work with too difficult class of framevork.
///     You can wrap this class and have more easier interface for interaction with it.
///     As an example for most commonly used cases.
/// </summary>
namespace Facade
{
    class DifficultClass
    {
        public void DoWork(string p1, string p2, string p3, string p4, string p5)
        {
            Console.WriteLine(p1 + p2 + p3 + p4 + p5);
        }
    }

    class MyFacade
    {
        private readonly DifficultClass difficultClass = new DifficultClass();
        public void DoABC () => difficultClass.DoWork("A", "B", "C", "", "");
    }
    class Program
    {
        static void Main(string[] _)
        {
            var simpleClass = new MyFacade();
            simpleClass.DoABC();
        }
    }
}
