using System;
/// <summary>
///     Adapter or Wrapper
///     Allows to objects with incompatible interfaces work together
///     
///     This example adopts class JSONSerialiser for needed interface
///     
/// </summary>
namespace Adapter
{
    interface ISerializer
    {
        string Serialize(Object obj);
    }

    class XMLSerialiser: ISerializer
    {
        public string Serialize(Object obj)
        {
            return "Object represented as XML";
        }
    }

    class JSONSerialiser
    {
        public string ToJSON(Object _)
        {
            return "Object represented as JSON";
        }
    }

    class JSONSerialiserWrapper : ISerializer
    {
        private readonly JSONSerialiser serialiser = new JSONSerialiser();
        public string Serialize (Object obj) => serialiser.ToJSON(obj);
    }

    class Printer
    {
        private readonly ISerializer serializer;
        public Printer(ISerializer serializer)
        {
            this.serializer = serializer;
        }
        public void Print(Object obj)
        {
            Console.WriteLine(serializer.Serialize(obj));
        }
    }


    class Program
    {
        static void Main(string[] _)
        {
            var xmlPrinter = new Printer(new XMLSerialiser());
            var jsonPrinter = new Printer(new JSONSerialiserWrapper());
            var obj = new Object();

            xmlPrinter.Print(obj);
            jsonPrinter.Print(obj);
        }
    }
}
