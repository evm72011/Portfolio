using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ServiceModel;
using ServiceCenterConnectControllerPool;
using ServerApp.Models;


namespace ServerApp.Controllers
{
    /// <summary>
    /// Api controller for working with user's session
    /// Connected to CenterConnectControllerPool
    /// </summary>
    [Route("api/session")]
    [ApiController]
    [AutoValidateAntiforgeryToken]
    public class ApiSessionController : ControllerPrototype<IServiceCenterConnectControllerPool>
    {
        /// <summary>
        /// Creates an instance of ApiSessionController
        /// </summary>
        public ApiSessionController(): base("CenterConnectControllerPool/ServiceCenterConnectControllerPool.svc")
        { }

        /// <summary>
        /// Creates user's session
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectControllerPool.SessionLogOn</param>
        /// <returns></returns>
        [HttpPost]
        [Route("logon")]
        public CloudUserGrantSetQueryResult SessionLogOn([FromBody] EntityToService<CloudLogOnData> data)
        {
            return channel.SessionLogOnAsync(data.entity).Result;
        }

        /// <summary>
        /// Ends user's session
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectControllerPool.SessionLogOff</param>
        /// <returns></returns>
        [HttpPost]
        [Route("logoff")]
        public OperationMethodResult SessionLogOff([FromBody] EntityToService<object> data)
        {
            return channel.SessionLogOffAsync(data.session).Result;
        }

        /// <summary>
        /// Change user's password
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectControllerPool.SessionChangeUserPassword</param>
        /// <returns></returns>
        [HttpPost]
        [Route("password")]
        public OperationMethodResult SessionChangeUserPassword([FromBody] EntityToService<string, string> data)
        {
            return channel.SessionChangeUserPasswordAsync(data.session, data.entity1, data.entity2).Result;
        }

        /// <summary>
        /// Updates (extends) user's session
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectControllerPool.SessionUpdate</param>
        /// <returns></returns>
        [HttpPost]
        [Route("update")]
        public OperationMethodResult SessionUpdate([FromBody] EntityToService<object> data)
        {
            return channel.SessionUpdateAsync(data.session).Result;
        }

        /// <summary>
        /// Returns numbers representation for value from FeaturePolicy
        /// </summary>
        /// <param name="data">Incapsulates data for CenterConnectControllerPool.SessionQueryFeaturePolicy</param>
        /// <returns></returns>
        [HttpPost]
        [Route("feature-number")]
        public FeatureExtension SessionQueryFeaturePolicyInt( [FromBody] EntityToService<CloudControllerFeature> data )
        {
            data.entity.valueData = new byte[] { 0x20 };
            return new FeatureExtension( channel.SessionQueryFeaturePolicyAsync( data.session, data.entity ).Result );
        }
    }
} 