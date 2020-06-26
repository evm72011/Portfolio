using System;
using Blockchain;
using System.Security.Cryptography;
using System.Text.Json;
using System.Text;
using System.Net.Http;
using Repository;

namespace Test
{
    class Program
    {
        static void Main(string[] _)
        {
            Chain chain1 = new Chain(new MemoryRepository<Block>());
            DummyData.FillChain(chain1, 2, "Chain 1 : Block #");

            Chain chain2 = new Chain(new MemoryRepository<Block>());
            chain2.Blocks[0] = chain1.Blocks[0];

            chain2.Merge(chain1);
            DummyData.FillChain(chain2, 2, "Chain 2 : Block ##");

            var validation = chain2.Validate();
            Console.WriteLine(chain2.ToJSONStringF());

            if (validation.Result)
                Console.WriteLine("Check is OK");
            else
            {
                Console.WriteLine(validation.Message);
                Console.WriteLine(validation.ErrorBlock.ToJSONStringF());
            }
        }
    }
}
