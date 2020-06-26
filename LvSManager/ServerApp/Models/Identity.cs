using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.Models
{
    /// <summary>
    /// Class for working wit identity values
    /// </summary>
    public static class Identity
    {
        private static readonly char[] idChars =
        {
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3',
            '4', '5',
        };

        /// <summary>
        /// Konvertiert die angegebene global, eindeutige Identität „<paramref name="guid"/>“ in eine lesbare Zeichenkette kurzer Schreibweise.
        /// </summary>
        /// <param name="guid">Die global, eindeutige Identität, die konvertiert werden soll.</param>
        /// <returns>Eine Zeichenkette, die die Identität als 5-Bit-Kodierung enthält.</returns>
        private static string guidToString(Guid guid)
        {
            byte[] id = guid.ToByteArray();
            char[] text = new char[26];

            ulong value =
                ((ulong)id[0]) |
                (((ulong)id[1]) << 8) |
                (((ulong)id[2]) << 16) |
                (((ulong)id[3]) << 24) |
                (((ulong)id[4]) << 32) |
                (((ulong)id[5]) << 40) |
                (((ulong)id[6]) << 48) |
                (((ulong)id[7]) << 56);

            text[0] = idChars[value & 0x1F];
            value >>= 5;
            text[1] = idChars[value & 0x1F];
            value >>= 5;
            text[2] = idChars[value & 0x1F];
            value >>= 5;
            text[3] = idChars[value & 0x1F];
            value >>= 5;
            text[4] = idChars[value & 0x1F];
            value >>= 5;
            text[5] = idChars[value & 0x1F];
            value >>= 5;
            text[6] = idChars[value & 0x1F];
            value >>= 5;
            text[7] = idChars[value & 0x1F];
            value >>= 5;
            text[8] = idChars[value & 0x1F];
            value >>= 5;
            text[9] = idChars[value & 0x1F];
            value >>= 5;
            text[10] = idChars[value & 0x1F];
            value >>= 5;
            text[11] = idChars[value & 0x1F];
            value >>= 5;

            value |=
                (((ulong)id[8]) << 4) |
                (((ulong)id[9]) << (4 + 8)) |
                (((ulong)id[10]) << (4 + 16)) |
                (((ulong)id[11]) << (4 + 24)) |
                (((ulong)id[12]) << (4 + 32)) |
                (((ulong)id[13]) << (4 + 40)) |
                (((ulong)id[14]) << (4 + 48));

            text[12] = idChars[value & 0x1F];
            value >>= 5;
            text[13] = idChars[value & 0x1F];
            value >>= 5;
            text[14] = idChars[value & 0x1F];
            value >>= 5;
            text[15] = idChars[value & 0x1F];
            value >>= 5;
            text[16] = idChars[value & 0x1F];
            value >>= 5;
            text[17] = idChars[value & 0x1F];
            value >>= 5;
            text[18] = idChars[value & 0x1F];
            value >>= 5;
            text[19] = idChars[value & 0x1F];
            value >>= 5;
            text[20] = idChars[value & 0x1F];
            value >>= 5;
            text[21] = idChars[value & 0x1F];
            value >>= 5;
            text[22] = idChars[value & 0x1F];
            value >>= 5;
            text[23] = idChars[value & 0x1F];

            byte endValue = id[15];

            text[24] = idChars[endValue & 0x1F];
            text[25] = idChars[endValue >> 5];

            return new string(text);
        }

        /// <summary>
        /// Generate new identity number if incoming parameter is empty
        /// </summary>
        /// <param name="identity"></param>
        /// <returns></returns>
        public static string GetId(string identity = null)
        {
            return string.IsNullOrEmpty(identity) ? guidToString(Guid.NewGuid()) : identity;
        }
    }
}
