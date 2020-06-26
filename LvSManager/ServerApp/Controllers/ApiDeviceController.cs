using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ServiceModel;
using ServiceCenterConnectManagerPool;
using ServerApp.Models;
using System.IO;

namespace ServerApp.Controllers
{
    /// <summary>
    /// Api controller for working with devices
    /// Connected to CenterConnectManagerPool
    /// </summary>
    [Route("api/device")]
    [ApiController]
    [AutoValidateAntiforgeryToken]
    public class ApiDeviceController : ControllerPrototype<IServiceCenterConnectManagerPool>
    {
        /// <summary>
        /// Creates an instance for ApiDeviceController
        /// </summary>
        public ApiDeviceController(): base("CenterConnectManagerPool/ServiceCenterConnectManagerPool.svc")
        {
        }

        /// <summary>
        /// Returns a list of alert devices
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.QueryAlertDevices</param>
        /// <returns></returns>
        [HttpPost]
        [Route("get")]
        public MobileAlertDeviceQueryResult QueryAlertDevices([FromBody] EntityToService<MobileAlertDeviceEntry> data)
        {
            return channel.QueryAlertDevicesAsync(data.session).Result;
        }

        /// <summary>
        /// Checks that data are valid for saving alert device in the cloud
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.ValidationCheck</param>
        /// <returns></returns>
        [HttpPost]
        [Route("valid")]
        public CloudValidationCheckQueryResult ValidationCheck([FromBody] EntityToService<MobileAlertDeviceEntry> data)
        {
            data.entity.identity.deviceId = Identity.GetId(data.entity.identity.deviceId);
            var result = channel.ValidationCheckAsync(data.session, data.entity).Result;
            return result;
        }

        /// <summary>
        /// Saves alert device in the cloud
        /// </summary>
        /// <param name="data"></param>
        /// <returns>Incapsulates data for CenterConnectManagerPool.CreateOrUpdateAlertDevice</returns>
        [HttpPost]
        [Route("write")]
        public OperationMethodResult CreateOrUpdateAlertDevice([FromBody] EntityToService<MobileAlertDeviceEntry> data)
        {
            data.entity.identity.deviceId = Identity.GetId(data.entity.identity.deviceId);
            return channel.CreateOrUpdateAlertDeviceAsync(data.session, data.entity).Result;
        }

        /// <summary>
        /// Deletes an instance of alert device from the cloud
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.DeleteAlertDevice</param>
        /// <returns></returns>
        [HttpPost]
        [Route("delete")]
        public OperationMethodResult DeleteAlertDevice([FromBody] EntityToService<MobileAlertDeviceEntry> data)
        {
            return channel.DeleteAlertDeviceAsync(data.session, data.entity.identity).Result;
        }

        /// <summary>
        /// Updates pin to an alert device
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.UpdateAlertDevicePrincipal</param>
        /// <returns></returns>
        [HttpPost]
        [Route( "pin" )]
        public OperationMethodResult UpdateAlertDevicePrincipal( [FromBody] EntityToService<MobileAlertDeviceIdentity, string> data )
        {
            return channel.UpdateAlertDevicePrincipalAsync( data.session, data.entity1, data.entity2 ).Result;
        }

        /// <summary>
        /// Updates permissions set for an alert device
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.UpdateAlertDevicePermissions</param>
        /// <returns></returns>
        [HttpPost]
        [Route( "rights" )]
        public OperationMethodResult UpdateAlertDevicePermissions( [FromBody] EntityToService<MobileAlertDeviceIdentity, MobileAlertDevicePermissions> data )
        {
            return channel.UpdateAlertDevicePermissionsAsync( data.session, data.entity1, data.entity2 ).Result;
        }

        /// <summary>
        /// Discart alert device registration in the cloud
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.DiscardAlertDeviceRegistration</param>
        /// <returns></returns>
        [HttpPost]
        [Route( "discard" )]
        public OperationMethodResult DiscardAlertDeviceRegistration( [FromBody] EntityToService<MobileAlertDeviceIdentity> data )
        {
            return channel.DiscardAlertDeviceRegistrationAsync( data.session, data.entity).Result;
        }
    }
}