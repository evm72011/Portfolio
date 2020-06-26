using System;
/// <summary>
///     State
///     Object can have some states
///     And logic inside class is different for different statets.
///     It is possible to realize with statement is .. else
///     But in case of many states it is not the most comfortable solutin.
///     We can use separete classes for each states and put logic in them.
/// </summary>
namespace State
{
    abstract class ContainerState
    {
        protected DataContainer container;
        public ContainerState(DataContainer container)
        {
            this.container = container;
        }
        public abstract void Print();
    }

    class NormalState : ContainerState
    {
        public NormalState(DataContainer container) : base(container) { }
        public override void Print() => Console.WriteLine("Normal state: " + this.container.Data);
    }

    class DangerState : ContainerState
    {
        public DangerState(DataContainer container) : base(container) { }
        public override void Print() => Console.WriteLine("Danger state: " + this.container.Data);
    }

    class DataContainer
    {
        public string Data { get; set; }
        private ContainerState State { get; set; }
        public void SwitchStateToNormal() => this.State = new NormalState(this);
        public void SwitchStateToDanger() => this.State = new DangerState(this);
        public void Print() => this.State?.Print();
    }
    class Program
    {
        static void Main(string[] _)
        {
            var container = new DataContainer { Data = "my data" };
            container.SwitchStateToNormal();
            container.Print();

            container.SwitchStateToDanger();
            container.Print();
        }
    }
}
