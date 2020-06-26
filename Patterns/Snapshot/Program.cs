using System;
using System.Collections.Generic;
/// <summary>
///     Snapshot
///     Allows to save history of objects states and restore needed state
/// </summary>
namespace Snapshot
{
    class Program
    {
        class DataContainer
        {
            private int Id { get; set; }
            private string data;
            public string Data
            {
                get => data;
                set
                {
                    ++Id;
                    data = value;
                }
            }
            public DataContainerShapshot MakeShapshot()
            {
                return new DataContainerShapshot() { Id = this.Id, Data = this.Data };
            }
            public void RestoreState(DataContainerShapshot shapshot)
            {
                this.Id = shapshot.Id;
                this.data = shapshot.Data;
            }
            public override string ToString() => $"Id: {Id}; Data: {Data}";
        }

        class DataContainerShapshot
        {
            public int Id { get; set; }
            public string Data { get; set; }
        }

        static void Main(string[] _)
        {
            var snapshots = new Stack<DataContainerShapshot>();
            
            var container = new DataContainer { Data = "My data"};
            snapshots.Push(container.MakeShapshot());
            Console.WriteLine(container);

            container.Data = "My new data";
            Console.WriteLine(container);

            container.RestoreState(snapshots.Pop());
            Console.WriteLine(container);
        }
    }
}
