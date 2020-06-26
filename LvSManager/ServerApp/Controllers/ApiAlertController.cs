using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceCenterConnectMobileAlertDevicePool;
using ServerApp.Models;


namespace ServerApp.Controllers
{
    /// <summary>
    /// Api controller for working with alerts
    /// Connected to CenterConnectMobileAlertDevicePool
    /// </summary>
    [Route( "api/alert" )]
    [ApiController]
    [AutoValidateAntiforgeryToken]
    public class ApiAlertController : ControllerPrototype<IServiceCenterConnectMobileAlertDevicePool>
    {
        /// <summary>
        /// Creates an instance of ApiAlertController
        /// </summary>
        public ApiAlertController() : base( "CenterConnectMobileAlertDevicePool/ServiceCenterConnectMobileAlertDevicePool.svc" )
        {
        }

        /// <summary>
        /// Sends an alert to a device
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectMobileAlertDevicePool.SessionSendAlertToDevice </param>
        /// <returns></returns>
        [HttpPost]
        [Route( "device" )]
        public OperationMethodResult SessionSendAlertToDevice( [FromBody] EntityToService<MobileAlertDeviceIdentitySender[], MobileAlertDeviceTelegram> data )
        {
            data.entity2.alertTimeUtc = DateTime.Now;
            data.entity2.expiryTimestampUtc = DateTime.Now.AddMinutes(30);
            data.entity2.identity = new MobileAlertDeviceTelegramIdentity
            {
                alarmContextIdentity = Identity.GetId(),
                alarmJobIdentity     = Identity.GetId()
            };
            return channel.SessionSendAlertToDeviceAsync( data.session, data.entity1, data.entity2 ).Result;
        }

        /// <summary>
        /// Sends an alert to a group
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectMobileAlertDevicePool.SessionSendAlertToSpreadGroup</param>
        /// <returns></returns>
        [HttpPost]
        [Route( "group" )]
        public OperationMethodResult SessionSendAlertToSpreadGroup( [FromBody] EntityToService<string, string, MobileAlertDeviceTelegram> data )
        {
            data.entity3.alertTimeUtc = DateTime.Now;
            data.entity3.expiryTimestampUtc = DateTime.Now.AddMinutes( 30 );
            data.entity3.identity = new MobileAlertDeviceTelegramIdentity
            {
                alarmContextIdentity = Identity.GetId(),
                alarmJobIdentity = Identity.GetId()
            };
            return channel.SessionSendAlertToSpreadGroupAsync( data.session, data.entity1, data.entity2, data.entity3 ).Result;
        }

        /// <summary>
        /// Sends registration information to the cloud
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectMobileAlertDevicePool.SendCloudRegistration</param>
        /// <returns></returns>
        [HttpPost]
        [Route( "cloud" )]
        public OperationMethodResult SendCloudRegistration( [FromBody] EntityToService<MobileAlertDeviceCloudRegistrationData> data )
        {
            string url = ApplicationSettings.ServerUrl;
            url = url.Replace( "https://", "" ).Replace( "http://", "" );
            url = url[ 0..^1 ];
            data.entity.serviceBindingHostName = url;
            return channel.SendCloudRegistrationAsync( data.session, data.entity).Result;
        }
    }
}