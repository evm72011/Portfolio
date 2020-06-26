using System;
/// <summary>
///     Factory Method
///     Child classes redefine type of created object.
///     All objects have a method with the same name but various behaviour
///     
///     The example relizes auto or air logistic.
///     
/// </summary>
namespace FactoryMethod
{
    interface ITransport
    {
        void Deliver();
    }

    class Car: ITransport
    {
        public void Deliver()
        {
            Console.WriteLine("Delivered by car");
        }
    }

    class Plane : ITransport
    {
        public void Deliver()
        {
            Console.WriteLine("Delivered by plane");
        }
    }

    abstract class Logistic
    {
        protected ITransport transport;
        public void Deliver() => transport.Deliver();
    }

    class CarLogistic: Logistic
    {
        public CarLogistic()
        {
            transport = new Car();
        }
    }

    class PlaneLogistic : Logistic
    {
        public PlaneLogistic()
        {
            transport = new Plane();
        }
    }

    class Program
    {
        static void Main(string[] _)
        {
            var carLogistic = new CarLogistic();
            carLogistic.Deliver();

            var planeLogistic = new PlaneLogistic();
            planeLogistic.Deliver();
        }
    }
}
