using System;
/// <summary>
///     Bridge
///     The idea is very simple and obvious. Explanation from example.
///     
///     We need to have various remote controls (simple and advanced) to various devices (TV, Radio and so on.)
///     We can make classes RemoteSimpleTV, RemoteAdvancedTV, RemoteSimpleRadio, AemoteAdvancedRadio
///     But we get to much classes, espetially if we will have to add a new device or new type for control
///     Decission - separate entities and connect them (as a bridge, with possession)
/// </summary>
namespace Bridge
{
    class Program
    {
        interface IDevice
        {
            void TurnOn();
            void TurnOff();
            void SetVolume(int volume);
        }

        class Radio: IDevice
        {
            public void TurnOn() => Console.WriteLine("Radio turned on");
            public void TurnOff () => Console.WriteLine("Radio turned off");
            public void SetVolume (int volume) => Console.WriteLine($"Radio volume to {volume}");
        }

        class TV : IDevice
        {
            public void TurnOn() => Console.WriteLine("TV turned on");
            public void TurnOff() => Console.WriteLine("TV turned off");
            public void SetVolume(int volume) => Console.WriteLine($"TV volume to {volume}");
        }

        class RemoteSimple
        {
            protected readonly IDevice device;
            public RemoteSimple(IDevice device)
            {
                this.device = device;
            }

            public void TurnOn() => device.TurnOn();
            public void TurnOff() => device.TurnOff();
            public void SetVolume(int volume) => device.SetVolume(volume);
        }

        class RemoteAdvanced : RemoteSimple
        {
            public void Mute() => device.SetVolume(0);

            public RemoteAdvanced(IDevice device)
                : base(device)
            { }
        }
        static void Main(string[] _)
        {
            var tv = new TV();
            var radio = new Radio();
            var remote1 = new RemoteAdvanced(tv);
            var remote2 = new RemoteSimple(radio);

            remote1.Mute();
            remote1.TurnOff();
            remote2.TurnOff();
        }
    }
}
