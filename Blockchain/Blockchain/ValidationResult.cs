using System;
using System.Collections.Generic;
using System.Text;

namespace Blockchain
{
    public class ValidationResult
    {
        public bool Result { get; set; }
        public string Message { get; set; }
        public Block ErrorBlock { get; set; }

        public ValidationResult(bool result, string message, Block errorBlock)
        {
            Result = result;
            Message = message;
            ErrorBlock = errorBlock;         
        }

        public ValidationResult() 
            :this(true, "OK", default)
            { }

        public ValidationResult(string message, Block errorBlock) 
            :this(false, message, errorBlock)
            { }

    }
}
