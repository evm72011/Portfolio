using System;
/// <summary>
///     Mediator
///     Allows to reduce dependencies between classes.
///     Interaction between classes occurs vis special class 
///     
///     In the example classes FireDetector, WaterPump, FireAlarm knows nothing about each other.
///     N.B. Better is to realize connection between FireDetector and FireSystem via event
/// </summary>
namespace Mediator
{
    abstract class SystemElement
    {
        protected bool active;
    }
    class FireDetector: SystemElement
    {
        public FireSystem ConnectedFireSystem { get; set; }
        public bool Active
        {
            get => active;
            set
            {
                active = value;
                Console.WriteLine("Detector's active is " + active);
                ConnectedFireSystem.Active = active;
            }
        }
    }

    class WaterPump : SystemElement
    {
        public bool Active
        {
            get => active;
            set
            {
                active = value;
                Console.WriteLine("Pump switched to " + active);
            }
        }
}
class FireAlarm : SystemElement
    {
        public bool Active
        {
            get => active;
            set
            {
                active = value;
                Console.WriteLine("Alarm switched to " + active);
            }
        }
    }

    class FireSystem : SystemElement
    {
        public WaterPump Pump { get; set; }
        public FireAlarm Alarm { get; set; }

        public bool Active
        {
            get => active;
            set
            {
                active = value;
                Pump.Active = active;
                Alarm.Active = active;
            }
        }

    }

    class Program
    {
        static void Main(string[] _)
        {
            var system = new FireSystem
            {
                Alarm = new FireAlarm(),
                Pump = new WaterPump()
            };

            var detector = new FireDetector
            {
                ConnectedFireSystem = system
            };

            detector.Active = true;
            Console.WriteLine();
            detector.Active = false;
        }
    }
}
