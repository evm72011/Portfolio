using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using Repository;

namespace Blockchain
{
    public class Chain
    {
        private readonly IRepository<Block> repository;
        private readonly static string HashStart = "0123";

        public List<Block> Blocks
        {
            get => repository.Items;
        }

        public int BlockCount { get => Blocks.Count; }

        public Chain(IRepository<Block> repository)
        {
            this.repository = repository;
            if (BlockCount == 0)
            {
                AddGenesisBlock();
            }
        }

        private void AddGenesisBlock()
        {
            Block genesisBlock = new Block
            {
                Index = 0
            };
            genesisBlock.Data = "genesis";
            genesisBlock.Mine(HashStart);
            repository.Add(genesisBlock);
        }

        public void AddBlock(Block block)
        {
            block.Index = Blocks.Last().Index + 1;
            block.PreviousHash = Blocks.Last().Hash;
            block.Mine(HashStart);
            repository.Add(block);
        }

        public ValidationResult Validate()
        {
            Block previousBlock = null;
            foreach (var block in Blocks)
            {
                if (block.ToHashString<Block>() != block.Hash)
                    return new ValidationResult("Saved hash isn't equal to calculated one", block);

                if (!block.Hash.StartsWith(HashStart))
                    return new ValidationResult("Hash doesn't correspond to the mask", block);

                if (block.IsGenesisBlock())
                {
                    previousBlock = block;
                    continue;
                }

                if (block.PreviousHash != previousBlock.Hash)
                    return new ValidationResult("Previos block has different hash", block);

                if (block.Index != previousBlock.Index + 1)
                    return new ValidationResult("Block's index increases incorectly", block);
                previousBlock = block;
            }
            return new ValidationResult();
        }

        public void Merge(Chain chain)
        {
            if (chain.BlockCount < 2) return;

            var validationResult = chain.Validate();
            if (!validationResult.Result)
                throw new Exception("The chain is not valid. Error block index = " + validationResult.ErrorBlock.Index);

            var index = IndexOfNewBlocks(chain);
            var blocks = chain.Blocks.GetRange(index, chain.BlockCount - index);
            if (this.BlockCount >= chain.BlockCount)
            {
                AppendBlocks(blocks);
            }
            else
            {
                InsertBlocks(blocks, index);
            }
        }

        private void AppendBlocks(List<Block> blocks)
        {
            blocks.ForEach(block => AddBlock(block));
        }

        private void InsertBlocks(List<Block> blocks, int index)
        {
            var shiftedBlocks = Blocks.GetRange(index, BlockCount - index);
            Blocks.RemoveRange(index, BlockCount - index);
            AppendBlocks(blocks);
            AppendBlocks(shiftedBlocks);
        }

        private int IndexOfNewBlocks(Chain chain)
        {
            int idx;
            for (idx = 0; (idx < this.BlockCount) && (idx < chain.BlockCount); idx++)
            {
                if (chain.Blocks[idx].IsGenesisBlock())
                    continue;
                if (this.Blocks[idx].Hash != chain.Blocks[idx].Hash)
                    return idx;
            }
            return idx;
        }
    }
}
