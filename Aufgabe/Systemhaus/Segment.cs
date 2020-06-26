using System;
using System.Collections.Generic;
using System.Text;

namespace Systemhaus
{
    public struct Segment
    {
        public Point P1 { get; set; }
        public Point P2 { get; set; }
        public Segment(Point p1, Point p2)
        {
            P1 = p1;
            P2 = p2;
        }
        public double LengthD
        {
            get => System.Math.Sqrt((P1.X - P2.X) * (P1.X - P2.X) + (P1.Y - P2.Y) * (P1.Y - P2.Y));
        }
        public double LengthW
        {
            get => P1.W + P2.W;
        }
        public override string ToString() => 
            P1 + " - " + P2 + "\n" + 
            "LengthD: " + Math.Round(LengthD) + "; LengthW:" + LengthW;
    }

}
