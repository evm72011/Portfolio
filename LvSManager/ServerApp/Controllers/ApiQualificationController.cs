using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServerApp.Models;
using ServiceCenterConnectManagerPool;

namespace ServerApp.Controllers
{
    /// <summary>
    /// Api controller for working with qualifications
    /// Connected to CenterConnectManagerPool
    /// </summary>
    [Route("api/qualification")]
    [ApiController]
    [AutoValidateAntiforgeryToken]
    public class ApiQualificationController : ControllerPrototype<IServiceCenterConnectManagerPool>
    {
        /// <summary>
        /// Creates an instance of ApiQualificationController
        /// </summary>
        public ApiQualificationController() : base("CenterConnectManagerPool/ServiceCenterConnectManagerPool.svc")
        {
        }

        /// <summary>
        /// Returns a list of qualifications
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.QueryQualifications</param>
        /// <returns></returns>
        [HttpPost]
        [Route("get")]
        public MobileAlertDeviceQualificationQueryResult QueryQualifications([FromBody] EntityToService<Object> data)
        {
            return channel.QueryQualificationsAsync(data.session).Result;
        }

        /// <summary>
        /// Synchrinizes set of qualifications with cloud's one
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectManagerPool.SynchronizeQualifications</param>
        /// <returns></returns>
        [HttpPost]
        [Route("synchronize")]
        public OperationMethodResult SynchronizeQualifications([FromBody] EntityToService<MobileAlertDeviceQualificationSet> data)
        {
            return channel.SynchronizeQualificationsAsync(data.session, data.entity).Result;
        }
    }
}