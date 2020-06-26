using System;
using System.Collections.Generic;
/// <summary>
///     Visitor
///     You have to do something with collections various objects.
///     For example draw geometrical shapes.
///     But logic for drawing is alien to be inside of these classes.
///     You can put this logic inside outer class (Visitor) and only run needed method in this class. 
/// </summary>
namespace Visitor
{
    class Shape
    {
        public virtual void Draw(DrawerVisitor draver) => draver.DrawShape(this);
    }

    class Circle: Shape
    {
        public override void Draw(DrawerVisitor draver) => draver.DrawCircle(this);
    }

    class Line: Shape
    {
        public override void Draw(DrawerVisitor draver) => draver.DrawLine(this);
    }

    class DrawerVisitor
    {
        public void DrawShape(Shape _) => Console.WriteLine("shape");
        public void DrawCircle(Circle _) => Console.WriteLine("circle");
        public void DrawLine(Line _) => Console.WriteLine("line");
    }


    class Program
    {
        static void Main(string[] _)
        {
            var shapes = new List<Shape>() { new Circle(), new Circle(), new Line(), new Shape() };
            var drawer = new DrawerVisitor();
            foreach (var shape in shapes)
            {
                shape.Draw(drawer);
            }
        }
    }
}
