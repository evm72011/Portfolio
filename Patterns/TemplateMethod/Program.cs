using System;
/// <summary>
///     Template Method
///     Defines the skeleton of an algorithm in the superclass but lets subclasses 
///     override specific steps of the algorithm without changing its structure
/// </summary>

namespace TemplateMethod
{
    abstract class Person
    {
        public string Name { get; set; }
        public abstract void Greeting();
        public void TellName() => Console.WriteLine($"Ich heiße {Name}");
        public abstract void Farawell();
        public void MakeSpeech()
        {
            Greeting();
            TellName();
            Farawell();
        }
    }

    class PolitePerson : Person
    {
        public override void Greeting() => Console.WriteLine("Sehr geehrte Damen und Herren,");
        public override void Farawell() => Console.WriteLine("Mit freundlichen Grüßen");
    }

    class RoughPerson : Person
    {
        public override void Greeting() => Console.WriteLine("Hallo,");
        public override void Farawell() => Console.WriteLine("Tschüss");
    }

    class Program
    {
        static void Main(string[] _)
        {
            var person1 = new PolitePerson() { Name = "John" };
            person1.MakeSpeech();
            Console.WriteLine();
            var person2 = new RoughPerson() { Name = "Donald" };
            person2.MakeSpeech();
        }
    }
}
