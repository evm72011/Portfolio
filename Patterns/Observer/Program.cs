using System;
/// <summary>
///     Observer
///     Creates a subscription mechanism to notify multiply objects if something happens with target objects. 
///     This example logs data changing with some log objects.
/// </summary>
namespace Observer
{
    class Program
    {
        class Logger
        {
            private readonly string name;
            public Logger(string name)
            {
                this.name = name;
            }
            public void Log(Object sender, DataEventArgs e)
            {
                Console.WriteLine($"{name}: Object changed. New value: {e.Data}");
            }
        }

        public class DataEventArgs : EventArgs
        {
            public readonly string Data;
            public DataEventArgs(string data)
            {
                this.Data = data;
            }
        }


        class Target
        {
            private string data;
            public string Data
            {
                get => data;
                set
                {
                    data = value;
                    EventOnChange(data);
                }
            }
            public event EventHandler<DataEventArgs> OnDataChange;
            private void EventOnChange(string data) => OnDataChange?.Invoke(this, new DataEventArgs(data));
        }

        static void Main(string[] _)
        {
            var logger1 = new Logger("Logger #1");
            var logger2 = new Logger("Logger #2");
            var target = new Target();

            target.OnDataChange += logger1.Log;
            target.OnDataChange += logger2.Log;
            target.Data = "my new string";
        }
    }
}
