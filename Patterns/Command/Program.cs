using System;
/// <summary>
///     Command
///     Often used for GUI interface
///     User can perform for example FileSave via main menu, context menu, panel button
///     Special class perform comand work.
///     Buttons and menu items only delegate work to it.
///     
///     N.B. In praxis commands attach with evens (see Observer pattern)
/// </summary>
namespace Command
{
    class Program
    {
        interface ICommand
        {
            void Execute();
        }

        class SaveFileCommand: ICommand
        {
            public void Execute() => Console.WriteLine("File saved");
        }

        abstract class GUIElement
        {
            private readonly ICommand command;
            public GUIElement(ICommand command)
            {
                this.command = command;
            }
            public void Execute() => command.Execute();
        }

        class Button : GUIElement
        { 
            public Button (ICommand command) :base(command) { }
        }

        class MenuItem : GUIElement
        {
            public MenuItem(ICommand command) : base(command) { }
        }

        static void Main(string[] _)
        {
            var command = new SaveFileCommand();

            var saveButton = new Button(command);
            var saveMenuItem = new MenuItem(command);
            saveButton.Execute();
            saveMenuItem.Execute();
        }
    }
}
