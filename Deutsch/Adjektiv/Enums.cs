using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.Reflection;

namespace Adjektiv
{
    public enum Case 
    {
        [Description("Nominativ")]
        Nom,
        [Description("Akkusativ")]
        Akk,
        [Description("Dativ")]
        Dat,
        [Description("Genitiv")]
        Gen
    }

    public enum Gender 
    {
        [Description("Geschlecht: Maskulinum")]
        M,
        [Description("Geschlecht: Neutrum")]
        N,
        [Description("Geschlecht: Femininum")]
        F,
        [Description("Plural")]
        P 
    }

    public enum ArticleType
    {
        [Description("I: bestimmter Artikel")]
        Definite,
        [Description("II: unbestimmter Artikel")]
        Indefinite,
        [Description("III: ohne Artikel")]
        Emty 
    }

    public static class EnumExtension
    {
        public static string GetDescription<T>(this T enumValue) where T : struct
        {
            Type type = enumValue.GetType();
            if (!type.IsEnum)
            {
                throw new ArgumentException("EnumerationValue must be of Enum type", "enumValue");
            }
            MemberInfo[] memberInfo = type.GetMember(enumValue.ToString());
            if (memberInfo != null && memberInfo.Length > 0)
            {
                object[] attrs = memberInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                if (attrs != null && attrs.Length > 0)
                {
                    return ((DescriptionAttribute)attrs[0]).Description;
                }
            }
            return enumValue.ToString();
        }
    }
}
