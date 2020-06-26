using System;
using System.Collections.Generic;
using System.Numerics;
using System.Text;
using System.Text.Json;
using System.Security.Cryptography;
using System.Linq;
using System.Text.Json.Serialization;
using System.Xml.Serialization;
using System.IO;
using Repository;

namespace Blockchain
{
    public class Block : IEntity
    {
        [XmlIgnore]
        public int Id{ get; set; }
        public int Index { get; set; }
        public DateTime TimeStamp { get; set; }
        public string Data { get; set; }

        [XmlIgnore]
        public string Hash { get; set; }
        public string PreviousHash { get; set; }

        public int Nonce { get; set; }

        public bool IsGenesisBlock () => (Index == 0);
        
        public void Mine(string hashMask)
        {
            var timeStart = DateTime.Now;
            while (true)
            {
                var currentHash = this.ToHashString<Block>();
                if (currentHash.StartsWith(hashMask))
                {
                    Hash = currentHash;
                    break;
                }
                Nonce++;
            }
            Console.WriteLine("Block mined for: " + (DateTime.Now - timeStart));
        }

        public Block()
        {
            TimeStamp = DateTime.Now;
        }
    }
}
