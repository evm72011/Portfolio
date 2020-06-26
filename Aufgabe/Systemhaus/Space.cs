using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Serialization;
using System.Text;

namespace Systemhaus
{
    public class Space
    {
        public int SizeX { get; set; }
        public int SizeY { get; set; }
        public int SizeW { get; set; }
        public Point Start { get; set; }
        public Point End { get; set; }
        public List<Point> Points { get; set; }
        [XmlIgnore]
        public List<Segment> Segments { get; set; }

        private Segment segmetnWithMaximalLength
        {
            get => new Segment(new Point(0, 0, SizeW), new Point(SizeX, SizeY, SizeW));
        }

        public Space() { }  // needed for serialization

        public Space(int sizeX, int sizeY, int sizeW)
        {
            SizeX = sizeX;
            SizeY = sizeY;
            SizeW = sizeW;
            Points = new List<Point>();
            Segments = new List<Segment>();
        }

        private void Assign(Space space)
        {
            SizeX = space.SizeX;
            SizeY = space.SizeY;
            SizeW = space.SizeW;
            Start = space.Start;
            End = space.End;
            Points = space.Points;
            Segments = space.Segments;
        }

        public void FillRandom(int count)
        {
            if (count < 1)
                throw new Exception("Space will empty!");
            Points.Clear();
            Segments.Clear();
            var rnd = Randomizer.getInstance();
            for (int i = 0; i < count; i++)
            {
                Point point = new Point
                {
                    X = rnd.Next(SizeX),
                    Y = rnd.Next(SizeY),
                    W = rnd.Next(SizeW),
                };
                Points.Add(point);
            }
            Start = Points[0];
            End = Points[Points.Count - 1];
        }

        public void FindWayDistance() => FindWay((s1, s2) => (s1.LengthD < s2.LengthD));
        public void FindWayWeight() => FindWay((s1, s2) => (s1.LengthW < s2.LengthW));

        private delegate bool CompareLength(Segment s1, Segment s2);

        private void FindWay(CompareLength compare)
        {
            Segments.Clear();
            var points = Points.Select(x => x).ToList();
            var currentPoint = Start;
            while ((points.Count > 0) && (currentPoint != End))
            {
                points.RemoveAll(point => (point == currentPoint));
                Segment bestSegment = this.segmetnWithMaximalLength; 
                foreach (var point in points)
                {
                    Segment segment = new Segment(currentPoint, point);
                    bestSegment = compare(segment, bestSegment) ? segment : bestSegment;
                }
                Segments.Add(bestSegment);
                currentPoint = bestSegment.P2;
            }
        }

        public void LoadFromFile(string fileName)
        {
            var space = XMLTools.LoadObject<Space>(fileName);
            space.Segments = new List<Segment>();
            this.Assign(space);
        }

        public void SaveToFile(string fileName)
        {
            XMLTools.SaveObject<Space>(this, fileName);
        }
    }
}
