using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Threading;
using Systemhaus;
using Point = Systemhaus.Point;

namespace Aufgabe
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly Space space;
        private readonly ViewModel viewModel;
        private readonly DispatcherTimer resizeTimer;
        
        public MainWindow()
        {
            InitializeComponent();
            space = new Space(10_000, 10_000, 10_000);
            viewModel = new ViewModel(canvasMain);
            
            resizeTimer = new DispatcherTimer
            { 
                Interval = new TimeSpan(0, 0, 0, 0, 500), 
                IsEnabled = false,
            };
            resizeTimer.Tick += resizeTimer_Tick;
        }

        private void resizeTimer_Tick(object sender, EventArgs e)
        {
            resizeTimer.IsEnabled = false;
            DisplaySpace();
        }

        private void Window_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            resizeTimer.IsEnabled = true;
            resizeTimer.Stop();
            resizeTimer.Start();
        }

        private void DisplayPoints()
        {
            viewModel.ClearPoints();
            space.Points.ForEach(point => viewModel.AddPoint(point, space.Start, space.End) );
        }

        private void DisplaySegments()
        {
            viewModel.ClearSegments();
            space.Segments.ForEach(segment => viewModel.AddSegment(segment));
        }

        private void DisplaySpace()
        {
            viewModel.Clear();
            viewModel.ScaleX = canvasMain.ActualWidth / space.SizeX;
            viewModel.ScaleY = canvasMain.ActualHeight / space.SizeY;
            DisplayPoints();
            DisplaySegments();
        }

        private void FillSpaceRandom(object sender, RoutedEventArgs e)
        {
            if (!int.TryParse(tbCount.Text, out int count))
            {
                count = 10_000;
                tbCount.Text = "10000";
            }
            space.FillRandom(count);
            DisplaySpace();
        }

        private void FindWayDistance(object sender, RoutedEventArgs e)
        {
            space.FindWayDistance();
            DisplaySegments();
        }

        private void FindWayWeight(object sender, RoutedEventArgs e)
        {
            space.FindWayWeight();
            DisplaySegments();
        }

        private void SaveToFile(object sender, RoutedEventArgs e)
        {
            var dlg = new Microsoft.Win32.SaveFileDialog
            {
                Filter = "XML files(*.xml)|*.xml|All files(*.*)|*.*"
            };
            if (dlg.ShowDialog() != true) return;
            space.SaveToFile(dlg.FileName);
        }

        private void LoadFromFile(object sender, RoutedEventArgs e)
        {
            var dlg = new Microsoft.Win32.OpenFileDialog
            {
                Filter = "XML files(*.xml)|*.xml|All files(*.*)|*.*"
            };
            if (dlg.ShowDialog() != true) return;
            try
            {
                space.LoadFromFile(dlg.FileName);
            }
            catch (Exception)
            {
                MessageBox.Show("Loading from file failure!");
                return;
            }
            DisplaySpace();
        }

    }
}
