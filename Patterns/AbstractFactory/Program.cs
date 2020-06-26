using System;
/// <summary>
///     Abstract factory
///     Creates family od dependent objects
///     
///     This example generates program code for various 2 program languages: Python and C#
///     
/// </summary>
namespace AbstractFactory
{
    interface ICodeGenerator
    {
        void Generate(string name);
    }

    public class PythonClassGenerator : ICodeGenerator
    {
        public void Generate(string name) => Console.WriteLine($"class {name}:\n   pass\n");
    }

    public class PythonInterfaceGenerator : ICodeGenerator
    {
        public void Generate(string name) => Console.WriteLine("# interfaces are not supported\n");
    }

    public class CSharpClassGenerator : ICodeGenerator
    {
        public void Generate(string name) => Console.WriteLine($"class {name}\n{{}}\n");
    }

    public class CSharpInterfaceGenerator : ICodeGenerator
    {
        public void Generate(string name) => Console.WriteLine($"interface {name}\n{{}}\n");
    }

    abstract class Language
    {
        protected ICodeGenerator classGenerator;
        protected ICodeGenerator interfaceGenerator;

        public void GenereteClass(string name) => classGenerator.Generate(name);
        public void GenereteInterface(string name) => interfaceGenerator.Generate(name);
    }

    class Python : Language
    {
        public Python()
        {
            classGenerator = new PythonClassGenerator();
            interfaceGenerator = new PythonInterfaceGenerator();
        }
    }

    class CSharp : Language
    {
        public CSharp()
        {
            classGenerator = new CSharpClassGenerator();
            interfaceGenerator = new CSharpInterfaceGenerator();
        }
    }


    class Program
    {
        static void Main(string[] _)
        {
            var python = new Python();
            python.GenereteClass("MyClass");
            python.GenereteInterface("IMyInterface");

            var csharp = new CSharp();
            csharp.GenereteClass("MyClass");
            csharp.GenereteInterface("IMyInterface");
        }
    }
}
