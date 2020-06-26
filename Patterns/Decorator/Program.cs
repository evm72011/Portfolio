using System;
/// <summary>
///     Decorator
///     Allows to add new functionality to class dinamically
///     It wraps the class in other classes
///     
///     The example "saves" data to the file.
///     Optionally the data can be compressed and/or encrypted
/// </summary>
namespace Decorator
{
    class Program
    {
        class DataSaver
        {
            public virtual void Save(string data)
            {
                Console.WriteLine($"Saved to file: {data}");
            }
        }
        
        abstract class DataSaverFacase: DataSaver
        {
            protected readonly DataSaver dataSaver;
            public DataSaverFacase(DataSaver dataSaver)
            {
                this.dataSaver = dataSaver;
            }
        }

        class CompressedDataSaver: DataSaverFacase
        {
            public CompressedDataSaver(DataSaver dataSaver)
                : base(dataSaver) { }
            public override void Save(string data)
            {
                dataSaver.Save($"Compressed({data})");
            }
        }

        class EncryptedDataSaver : DataSaverFacase
        {
            public EncryptedDataSaver(DataSaver dataSaver)
                : base(dataSaver) { }

            public override void Save(string data)
            {
                dataSaver.Save($"Encrypted({data})");
            }
        }

        static void Main(string[] _)
        {
            bool mustBeCompressed = true;
            bool mustBeEncrypted = true;

            var data = "Test data";
            var dataSaver = new DataSaver();
            dataSaver = mustBeCompressed ? new CompressedDataSaver(dataSaver) : dataSaver;
            dataSaver = mustBeEncrypted ? new EncryptedDataSaver(dataSaver) : dataSaver;

            dataSaver.Save(data);
        }
    }
}
