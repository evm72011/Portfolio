using System;
/// <summary>
///     Prototype
///     Allows to create a copy of an object
/// </summary>
namespace Prototype
{
    class Entity
    {
        public string Data { get; set; }
        public Entity Clone()
        {
            return new Entity
            {
                Data = this.Data
            };
        }
    }

    class Program
    {
        static void Main(string[] _)
        {
            var entity1 = new Entity { Data = "String data"};
            var entity2 = entity1.Clone();

            Console.WriteLine(entity1 == entity2);
            Console.WriteLine(entity1.Data);
            Console.WriteLine(entity2.Data);
        }
    }
}
