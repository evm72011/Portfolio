using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;
using ServiceCenterConnectControllerPool;

namespace ServerApp.Models
{
    /// <summary>
    /// Extension (via inheritance) to the class CenterConnectControllerPool.CloudControllerFeaturePolicyQueryResult
    /// </summary>
    public class FeatureExtension: CloudControllerFeaturePolicyQueryResult
    {
        /// <summary>
        /// Creates an instance of FeatureExtension
        /// </summary>
        /// <param name="feature"></param>
        public FeatureExtension(CloudControllerFeaturePolicyQueryResult feature)
        {
            foreach (var item in feature.GetType().GetProperties())
            {
                PropertyInfo prop = typeof(CloudControllerFeaturePolicyQueryResult).GetProperty(item.Name);
                if (prop is null) continue;
                try
                {
                    prop.SetValue(this, item.GetValue(feature));
                }
                catch (Exception)
                {
                    prop.SetValue( this, null );
                }
            }
        }

        /// <summary>
        /// Represents value of FeaturePolicy as a number (not a bitmask)
        /// </summary>
        public long valueNumber
        {
            get
            {
                if( this.valueData is null || this.valueData.Length == 0 ) return 0;
                long value = 0L;
                for( int index = Math.Min( 7, this.valueData.Length - 1 ); index >= 0; index-- )
                {
                    value = ( value << 8 ) | ( this.valueData[ index ] );
                }
                return value;
            }     
        }
    }
}
