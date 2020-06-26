using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;
using System.IO;


namespace Systemhaus
{
    public class XMLTools
    {
        /// <summary>
        /// Saves object to an XML file
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        /// <param name="fileName"></param>
        public static void SaveObject<T>(T obj, string fileName)
        {
            XmlSerializer serializer = new XmlSerializer(typeof(T));
            Stream fs = new FileStream(fileName, FileMode.Create);
            TextWriter writer = new StreamWriter(fs, Encoding.UTF8);
            serializer.Serialize(writer, obj);
            writer.Close();
        }

        /// <summary>
        /// Returns an onbject from an XML file
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public static T LoadObject<T>(string fileName)
        {
            XmlSerializer serializer = new XmlSerializer(typeof(T));
            T result;
            using (Stream reader = new FileStream(fileName, FileMode.Open))
            {
                result = (T)serializer.Deserialize(reader);
            }
            return result;
        }
    }
}
