using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.Models
{
    /// <summary>
    /// Contains all needed information for sending it to a WCF service
    /// </summary>
    /// <remarks>
    /// Class-wrapper. Works as a packet. In fact here added information about user's session.
    /// Information comes from Angular application as this packet, unwraps here and sends to a WCF.
    /// </remarks>
    /// <typeparam name="T">Type of the wrapped entity</typeparam>
    public class EntityToService<T>
    {
        /// <summary>
        /// Information about the user's session
        /// </summary>
        public CloudUserSession session { get; set; }

        /// <summary>
        /// An instance of intity
        /// </summary>
        public T entity { get; set; }
    }

    /// <summary>
    /// Contains all needed information for sending it to a WCF service
    /// </summary>
    /// <remarks>
    /// All as in previous class EntityToService<T>, but here wrapped 2 entities
    /// </remarks>
    /// <typeparam name="T1">Type of the first wrapped entity</typeparam>
    /// <typeparam name="T2">Type of the second wrapped entity</typeparam>
    public class EntityToService<T1, T2>
    {
        public CloudUserSession session { get; set; }
        public T1 entity1 { get; set; }
        public T2 entity2 { get; set; }
    }

    /// <summary>
    /// Contains all needed information for sending it to a WCF service
    /// </summary>
    /// <remarks>
    /// All as in previous class EntityToService<T>, but here wrapped 3 entities
    /// </remarks>
    /// <typeparam name="T1">Type of the first wrapped entity</typeparam>
    /// <typeparam name="T2">Type of the second wrapped entity</typeparam>
    /// <typeparam name="T3">Type of the third wrapped entity</typeparam>
    public class EntityToService<T1, T2, T3> : EntityToService<T1, T2>
    {
        public T3 entity3 { get; set; }
    }

}
