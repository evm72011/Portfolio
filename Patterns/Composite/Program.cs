using System;
using System.Collections.Generic;
using System.Linq;
/// <summary>
///     Composite
///     Alolows to compose objects into tree structure and then work with these structures 
///     as if they were individual objects.
///     
///     The example calculates total size of the Folder with all subfolders
///     
/// </summary>
namespace Composite
{
    class Program
    {
        interface IDiskEntity
        {
            int Size { get; }
        }

        class Folder: IDiskEntity
        {
            private readonly List<IDiskEntity> content;
            public int Size
            {
                get => content.Select(x => x.Size).Aggregate((a, b) => a + b);
            }
            public Folder(List<IDiskEntity> content)
            {
                this.content = content;
            }
        }

        class File : IDiskEntity
        {
            private readonly int size;
            public int Size
            {
                get => size;
            }
            public File(int size)
            {
                this.size = size;
            }
        }

        static void Main(string[] _)
        {
            var file1 = new File(10);
            var file2 = new File(20);
            var file3 = new File(30);
            var folder1 = new Folder(new List<IDiskEntity> { file1, file2, file3 });        //60

            var file4 = new File(25);
            var file5 = new File(25);
            var file6 = new File(25);
            var folder2 = new Folder(new List<IDiskEntity> { file4, file5, file6 });        //75

            var file7 = new File(40);

            var folder3 = new Folder(new List<IDiskEntity> { file7, folder1, folder2 });    //175
            Console.WriteLine(folder3.Size);
        }
    }
}
