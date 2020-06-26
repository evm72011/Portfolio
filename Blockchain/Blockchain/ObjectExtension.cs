using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Xml.Serialization;
using System.IO;
using System.Security.Cryptography;
using System.Xml;

namespace Blockchain
{
    public static class ObjectExtension
    {
        public static string ToJSONString(this Object obj)
        {
            return JsonSerializer.Serialize(obj);
        }

        public static string ToXMLString<T>(this Object obj)
        {
            if (!(obj is T))
                throw new Exception("Types mismatch");

            XmlSerializer serializer = new XmlSerializer(typeof(T));
            using StringWriter textWriter = new StringWriter();
            serializer.Serialize(textWriter, obj);
            return textWriter.ToString();
        }

        public static string ToHashString<T>(this Object obj)
        {
            string xml = obj.ToXMLString<T>();
            HashAlgorithm sha = new SHA256CryptoServiceProvider();
            var buffer = Encoding.ASCII.GetBytes(xml);
            var bytes = sha.ComputeHash(buffer);
            StringBuilder sb = new StringBuilder();
            foreach (var item in bytes)
            {
                sb.Append(item.ToString("x2"));
            }
            return sb.ToString();
        }

        public static string ToJSONStringF(this Object obj)
        {
            string result = "";
            int indent = 0;
            var jsonStr = obj.ToJSONString();
            foreach (var symbol in jsonStr)
            {
                if ("{[".Contains(symbol))
                {
                    result += symbol;
                    indent += 2;
                    result += "\n" + new String(' ', indent);
                }
                else if ("}]".Contains(symbol))
                {
                    indent -= 2;
                    result += "\n" + new String(' ', indent) + symbol;
                }
                else if (",".Contains(symbol))
                {
                    result += symbol + "\n" + new String(' ', indent);
                }
                else
                    result += symbol;
            }
            return result;
        }
    }
}
