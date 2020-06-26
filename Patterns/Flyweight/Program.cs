using System;

/// <summary>
///     Flyweight
///     
///     Allows to save RAM. 
///     You have much objects. Many of rhem have the same set of properies.
///     This set of properties you can mace as separate object and use it with reference.
///     
///     Example.
///     Graphical application. Partical has coordinates, velocity, color, geometry and size.
///     But in current task all particals are white and have size 1px
/// </summary>
namespace Flyweight
{
    enum Colors
    {
        White, Black, Red
    }
    class ParticalView
    {
        public int Size { get; set; }
        public Colors Color { get; set; }
    }
    class Partical
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int VelosityX { get; set; }
        public int VelosityY { get; set; }
        public ParticalView View { get; set; }
    }
    class Program
    {
        static void Main(string[] _)
        {
            var viewWhite1 = new ParticalView { Color = Colors.White, Size = 1 };
            int count = 10_000_000;
            var particles = new Partical[count];
            for (int i = 0; i < particles.Length; i++)
            {
                particles[i] = new Partical { View = viewWhite1 }; 
            }
            Console.WriteLine("Done: " + particles.Length);
        }
    }
}
