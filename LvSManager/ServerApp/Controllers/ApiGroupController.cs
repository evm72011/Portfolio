using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceCenterConnectManagerPool;
using System.ServiceModel;
using ServerApp.Models;
using System.IO;
using System.Text;
using System.Threading;

namespace ServerApp.Controllers
{
    /// <summary>
    /// Api controller for working with spread groups
    /// Connected to CenterConnectManagerPool
    /// </summary>
    [Route("api/group")]
    [ApiController]
    [AutoValidateAntiforgeryToken]
    public class ApiGroupController : ControllerPrototype<IServiceCenterConnectManagerPool>
    {
        /// <summary>
        /// Creates an instance of ApiGroupController
        /// </summary>
        public ApiGroupController(): base("CenterConnectManagerPool/ServiceCenterConnectManagerPool.svc")
        {
        }

        /// <summary>
        /// Returns a list of spread groups
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.QuerySpreadGroups</param>
        /// <returns></returns>
        [HttpPost]
        [Route("get")]
        public MobileAlertDeviceSpreadGroupQueryResult QuerySpreadGroups([FromBody] EntityToService<MobileAlertDeviceSpreadGroup> data)
        {
            return channel.QuerySpreadGroupsAsync(data.session).Result;
        }

        /// <summary>
        /// Checks that data are valid for saving spread group in the cloud
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.ValidationCheckSpreadGroup</param>
        /// <returns></returns>
        [HttpPost]
        [Route("valid")]
        public CloudValidationCheckQueryResult ValidationCheckSpreadGroup([FromBody] EntityToService<MobileAlertDeviceSpreadGroup> data)
        {
            data.entity.identity = Identity.GetId(data.entity.identity);
            var result = channel.ValidationCheckSpreadGroupAsync(data.session, data.entity).Result;
            return result;
        }

        /// <summary>
        /// Saves spread group in the cloud
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.WriteSpreadGroup</param>
        /// <returns></returns>
        [HttpPost]
        [Route("write")]
        public OperationMethodResult WriteSpreadGroup([FromBody] EntityToService<MobileAlertDeviceSpreadGroup> data)
        {
            data.entity.identity = Identity.GetId(data.entity.identity);
            return channel.WriteSpreadGroupAsync(data.session, data.entity).Result;
        }

        /// <summary>
        /// Deletes an instance of spread group from the cloud
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.DeleteSpreadGroup</param>
        /// <returns></returns>
        [HttpPost]
        [Route("delete")]
        public OperationMethodResult DeleteSpreadGroup([FromBody] EntityToService<MobileAlertDeviceSpreadGroup> data)
        {
            return channel.DeleteSpreadGroupAsync(data.session, data.entity.identity).Result;
        } 
    }
} 