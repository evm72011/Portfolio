using System;
using System.Threading;
/// <summary>
///     Singleton
///     Guarantees that there exist only one instance of class
///     
///     The уxample shows realisation for sync and async cases
///     
/// </summary>
namespace Singleton
{
    class Program
    {
        class Singleton
        {
            private static Singleton instance;
            public static Singleton Instance
            {
                get => instance is null ? instance = new Singleton() : instance;
            }
            public string Info { get; set; }
        }

        class SingletonAsync
        {
            private static Singleton instance;
            private static readonly Object _lock = new Object();
            public static Singleton Instance
            {
                get
                {
                    if (instance is null)
                    {
                        lock (_lock)
                        {
                            if (instance is null)
                                instance = new Singleton();
                        }
                    }
                    return instance;
                }
            }
            public string Info { get; set; }
        }

        static void Main(string[] _)
        {
            var singleton1 = Singleton.Instance;
            var singleton2 = Singleton.Instance;
            singleton1.Info = "AAA";
            singleton2.Info = "BBB";
            Console.WriteLine($"singleton1.Info: {singleton1.Info}");
            Console.WriteLine($"singleton2.Info: {singleton1.Info}");
            Console.WriteLine();

            Thread process1 = new Thread(() =>
            {
                var singleton = SingletonAsync.Instance;
                singleton.Info = "AAA";
                Thread.Sleep(500);
                Console.WriteLine($"Singleton in Thread #1 Info: {singleton.Info}");
            });
            Thread process2 = new Thread(() =>
            {
                var singleton = SingletonAsync.Instance;
                singleton.Info = "BBB";
                Thread.Sleep(500);
                Console.WriteLine($"Singleton in Thread #2 Info: {singleton.Info}");
            });
            process1.Start();
            process2.Start();
            process1.Join();
            process2.Join();
        }
    }
}
