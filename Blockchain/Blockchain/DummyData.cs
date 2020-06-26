using System;
using System.Collections.Generic;
using System.Text;

namespace Blockchain
{
    public class DummyData
    {
        public static void FillChain(Chain chain, int count, string prefix)
        {
            for (int i = 0; i < count; i++)
            {
                var block = new Block
                {
                    Data = prefix + i
                };
                chain.AddBlock(block);
            }
        }
    }
}
