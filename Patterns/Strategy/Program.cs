using System;
using System.Collections.Generic;
/// <summary>
///     Strategy
///     Defines the family of analogous algorithms, 
///     puts each of them into a separate class,
///     and use afterwards as a parameter
///     
///     Example realise calculator wit 4 arithmetic operations.
///     
///     N.B: It is oft more comfortable not packing methods in classes.
///     But use them as a parameter directly (as a delegate or lambda expression)
/// </summary>
namespace Strategy
{
    interface IOperation
    {
        double Execute(double a, double b);
    }

    class Add : IOperation
    {
        public double Execute(double a, double b) => a + b;
        public override string ToString() => "+";
    }

    class Sub : IOperation
    {
        public double Execute(double a, double b) => a - b;
        public override string ToString() => "-";
    }

    class Mult : IOperation
    {
        public double Execute(double a, double b) => a * b;
        public override string ToString() => "*";
    }

    class Div : IOperation
    {
        public double Execute(double a, double b) => a / b;
        public override string ToString() => "/";
    }

    class Calculator
    {
        public double Execute(double a, double b, IOperation operation) => operation.Execute(a, b);
    }

    class Program
    {
        static void Main(string[] _)
        {
            var calculator = new Calculator();
            double a = 3;
            double b = 2;
            var operList = new List<IOperation>() { new Add(), new Sub(), new Mult(), new Div() };
            foreach (var oper in operList)
            {
                Console.WriteLine($"{a} {oper} {b} = {calculator.Execute(a, b, oper)}");
            }
        }
    }
}
