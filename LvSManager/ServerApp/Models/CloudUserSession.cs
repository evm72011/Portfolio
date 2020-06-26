using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using ServiceCenterConnectControllerPool;
using ServiceCenterConnectManagerPool;
using ServiceCenterConnectMobileAlertDevicePool;


namespace ServerApp.Models
{
    /// <summary>
    /// Describes CloudUserSession entity
    /// </summary>
    /// <remarks>
    /// Each connected WCF service contains own CloudUserSession class with the same metadata
    /// This class is used in this application and converts to WCF's CloudUserSession where needed
    /// </remarks>
    public class CloudUserSession
    {
        /// <summary>
        /// Identity field for CloudUserSession
        /// </summary>
        public string identity { get; set; }

        /// <summary>
        /// Conversion CloudUserSession --> ServiceCenterConnectControllerPool.CloudUserSession
        /// </summary>
        /// <param name="session">Converted value</param>
        public static implicit operator ServiceCenterConnectControllerPool.CloudUserSession(CloudUserSession session)
        {
            return new ServiceCenterConnectControllerPool.CloudUserSession
            {
                identity = session.identity
            };
        }

        /// <summary>
        /// Conversion CloudUserSession --> ServiceCenterConnectManagerPool.CloudUserSession
        /// </summary>
        /// <param name="session">Converted value</param>
        public static implicit operator ServiceCenterConnectManagerPool.CloudUserSession(CloudUserSession session)
        {
            return new ServiceCenterConnectManagerPool.CloudUserSession
            {
                identity = session.identity
            };
        }

        /// <summary>
        /// Conversion CloudUserSession --> ServiceCenterConnectMobileAlertDevicePool.CloudUserSession
        /// </summary>
        /// <param name="session">Converted value</param>
        public static implicit operator ServiceCenterConnectMobileAlertDevicePool.CloudUserSession( CloudUserSession session )
        {
            return new ServiceCenterConnectMobileAlertDevicePool.CloudUserSession
            {
                identity = session.identity
            };
        }

    }
}
