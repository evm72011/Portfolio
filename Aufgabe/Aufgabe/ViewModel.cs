using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Shapes;
using Systemhaus;
using System.Windows.Media;
using Point = Systemhaus.Point;


namespace Aufgabe
{
    public class ViewModel
    {
        private readonly Canvas canvas;
        public List<Ellipse> Points { get; set; }
        public List<Line> Segments { get; set; }
        public double ScaleX { get; set; }
        public double ScaleY { get; set; }

        public ViewModel(Canvas canvas)
        {
            this.canvas = canvas;
            Points = new List<Ellipse>();
            Segments = new List<Line>();
        }

        public void AddPoint(Point point, Point start, Point end)
        {
            Ellipse ellipse = new Ellipse
            {
                Tag = point,
                Width = 5,
                Height = 5,
                Margin = new Thickness(point.X * ScaleX,
                           point.Y * ScaleY, 0, 0)
            };
            if (point == start)
                ellipse.Fill = Brushes.Green;
            else if (point == end)
                ellipse.Fill = Brushes.Red;
            else
                ellipse.Fill = Brushes.LightGray;
            ellipse.ToolTip = point;
            canvas.Children.Add(ellipse);
            Points.Add(ellipse);
        }

        public void AddSegment(Segment segment)
        {
            Line line = new Line
            {
                X1 = segment.P1.X * ScaleX + 3,
                Y1 = segment.P1.Y * ScaleY + 3,
                X2 = segment.P2.X * ScaleX + 3,
                Y2 = segment.P2.Y * ScaleY + 3,
                Stroke = Brushes.LightGreen,
                StrokeThickness = 2,
                ToolTip = segment
            };
            canvas.Children.Add(line);
            Segments.Add(line);
        }

        public void ClearSegments()
        {
            Segments.ForEach(line => canvas.Children.Remove(line));
            Segments.Clear();
        }

        public void ClearPoints()
        {
            Points.ForEach(ellipse => canvas.Children.Remove(ellipse));
            Points.Clear();
        }

        public void Clear()
        {
            ClearSegments();
            ClearPoints();
        }
    }
}
