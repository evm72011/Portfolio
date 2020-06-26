using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;


namespace ServerApp.Models
{
    /// <summary>
    /// Contains common setting information for the application
    /// </summary>
    public static class ApplicationSettings
    {
        /// <summary>
        /// Url to the Cloud
        /// </summary>
        public static string ServerUrl { get; set; }

        /// <summary>
        /// Url to proxy
        /// </summary>
        public static string ProxyUrl { get; set; }

        /// <summary>
        /// A switcher, is the application in development or deployment mode
        /// </summary>
        public static bool DevelopmetMode { get; set; }

        /// <summary>
        /// Loads Settings information from IConfiguration object, in fact from appsettings.json
        /// </summary>
        /// <param name="configuration"></param>
        public static void LoadSettings(IConfiguration configuration)
        {
            ServerUrl = configuration["ServerUrl"];
            ProxyUrl  = configuration["ProxyUrl"];
            DevelopmetMode = bool.Parse(configuration[ "DevelopmetMode" ]);
        }
    }
}
