using System;
using System.Threading;
/// <summary>
///     Proxy
///     Alows to replace original object by substitute
///     Proxy controls access to original object, allows you to 
///     perform some additional methods befor/after using the origin
///     
///     For example there is a class allows you to save data to a database.
///     The connection takes some time. So it is better, to do it only if needed
/// </summary>

namespace Proxy
{
    class DBSaver
    {
        public DBSaver(string connectionString)
        {
            Console.WriteLine("Wait for connection ...");
            Thread.Sleep(3000);
            Console.WriteLine("Connected to: " + connectionString);
        }

        public void Save(string data)
        {
            Console.WriteLine("Saved: " + data);
        }
    }

    class DBSaverProxy
    {
        private DBSaver dbSaver;
        private readonly string connectionString;
        public DBSaverProxy(string connectionString)
        {
            this.connectionString = connectionString;
            Console.WriteLine("Proxy created");
        }

        public void Save(string data)
        {
            if (dbSaver is null)
                dbSaver = new DBSaver(connectionString);
            dbSaver.Save(data);
        }
    }

    class Program
    {
        static void Main(string[] _)
        {
            var saver = new DBSaver("myDB");
            var proxy = new DBSaverProxy("myDB");

            Console.WriteLine("0 - save via DBSaver, 1 - save via Proxy, others - none");
            var task = Console.ReadLine();

            if (task == "0")
                saver.Save("my data");
            else if (task == "1")
                proxy.Save("my data");
        }
    }
}
