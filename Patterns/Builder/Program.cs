using System;
/// <summary>
///     Builder
///     Creates difficult ojects step by step.
///     This allows to make constructor easier
///     We can use Builder directly or we can delegate this to special class - Director
///     
///     The example build hauses with various degree of complexity
///     
/// </summary>
namespace Builder
{
    class House
    {
        public int RoomsCount { get; set; }
        public int WindowsCount { get; set; }
        public int DoorsCount { get; set; }
        public override string ToString() => $"Rooms: {RoomsCount}, Windows: {WindowsCount}, Doors: {DoorsCount}";
    }

    class Builder
    {
        public void BuildRooms(House house, int count) => house.RoomsCount = count;
        public void BuildWindows(House house, int count) => house.WindowsCount = count;
        public void BuildDoors(House house, int count) => house.DoorsCount = count;
    }

    class Director
    {
        private readonly Builder builder = new Builder();
        public House BuildPalace()
        {
            var house = new House();
            builder.BuildRooms(house, 100);
            builder.BuildWindows(house, 500);
            builder.BuildDoors(house, 102);
            return house;
        }

        public House BuildShack()
        {
            var house = new House();
            builder.BuildRooms(house, 1);
            builder.BuildWindows(house, 1);
            builder.BuildDoors(house, 1);
            return house;
        }
    }

    class Program
    {
        static void Main(string[] _)
        {
            var director = new Director();
            var shack = director.BuildShack();
            var palace = director.BuildPalace();

            Console.WriteLine("Shack: " + shack);
            Console.WriteLine("Palace: " + palace);
        }
    }
}
