using System;
using System.Reflection;

namespace Systemhaus
{
    public struct Point
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int W { get; set; }

        public Point(int x, int y, int w)
        {
            X = x;
            Y = y;
            W = w;
        }

        public override string ToString() => $"(X:{X}; Y:{Y}; W:{W})";

        public override bool Equals(object obj)
        {
            return obj is Point point &&
                   X == point.X &&
                   Y == point.Y &&
                   W == point.W;
        }

        public override int GetHashCode()
        {
            int hashCode = -525952863;
            hashCode = hashCode * -1521134295 + X.GetHashCode();
            hashCode = hashCode * -1521134295 + Y.GetHashCode();
            hashCode = hashCode * -1521134295 + W.GetHashCode();
            return hashCode;
        }

        public static bool operator ==(Point p1, Point p2)
        {
            return p1.Equals(p2);
        }

        public static bool operator !=(Point p1, Point p2)
        {
            return !p1.Equals(p2);
        }
    }
}
