using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServerApp.Models;
using System.ServiceModel;
using ServiceCenterConnectManagerPool;

namespace ServerApp.Controllers
{
    /// <summary>
    /// Api controller for working with links between spread groups and alert devices
    /// Connected to CenterConnectManagerPool
    /// </summary>
    [Route("api/link")]
    [ApiController]
    [AutoValidateAntiforgeryToken]
    public class ApiLinkController : ControllerPrototype<IServiceCenterConnectManagerPool>
    {
        /// <summary>
        /// Creates an instance of ApiLinkController
        /// </summary>
        public ApiLinkController() : base("CenterConnectManagerPool/ServiceCenterConnectManagerPool.svc")
        {
        }

        /// <summary>
        /// Returns a list of all existing links between spread groups and alert devices
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.QuerySpreadGroupLinkToAlertDevices</param>
        /// <returns></returns>
        [HttpPost]
        [Route("get")]
        public MobileAlertDeviceSpreadGroupLinkToAlertDeviceQueryResult QuerySpreadGroupLinkToAlertDevices([FromBody] EntityToService<Object> data)
        {
            return channel.QuerySpreadGroupLinkToAlertDevicesAsync(data.session).Result;
        }

        /// <summary>
        /// Saves a link in the cloud
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.WriteSpreadGroupLinkToAlertDevice</param>
        /// <returns></returns>
        [HttpPost]
        [Route("write")]
        public OperationMethodResult WriteSpreadGroupLinkToAlertDevice([FromBody] EntityToService<MobileAlertDeviceSpreadGroupLinkToAlertDevice> data)
        {
            return channel.WriteSpreadGroupLinkToAlertDeviceAsync(data.session, data.entity).Result;
        }

        /// <summary>
        /// Deletes a link from the cloud
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.DeleteSpreadGroupLinkToAlertDevice</param>
        /// <returns></returns>
        [HttpPost]
        [Route("delete")]
        public OperationMethodResult DeleteSpreadGroupLinkToAlertDevice([FromBody] EntityToService<MobileAlertDeviceSpreadGroupLinkToAlertDevice> data)
        {
            return channel.DeleteSpreadGroupLinkToAlertDeviceAsync(data.session, data.entity).Result;
        }
    }
}