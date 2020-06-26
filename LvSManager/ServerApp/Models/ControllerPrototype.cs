using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.ServiceModel;



namespace ServerApp.Models
{
    /// <summary>
    /// Parent class for all Api controllers
    /// Perform commont tasks for binding to a WCF service
    /// </summary>
    /// <typeparam name="I">The interface from the connecting WCF service</typeparam>
    public class ControllerPrototype<I> : Controller
    {
        private readonly BasicHttpsBinding binding;
        private readonly EndpointAddress endpoint;
        private readonly ChannelFactory<I> channelFactory;
        protected I channel;

        /// <summary>
        /// Base constructor for all child classes
        /// </summary>
        /// <param name="serviceUrl">Endpoint url to the WCF service</param>
        public ControllerPrototype(string serviceUrl)
        {
            binding = new BasicHttpsBinding();
            string proxyUrl = ApplicationSettings.ProxyUrl;
            if (string.IsNullOrEmpty(proxyUrl))
            {
                binding.UseDefaultWebProxy = true;
            }
            else
            {
                binding.UseDefaultWebProxy = false;
                binding.ProxyAddress = new System.Uri(proxyUrl);
            }            
            endpoint = new EndpointAddress(ApplicationSettings.ServerUrl + serviceUrl);
            channelFactory = new ChannelFactory<I>(binding, endpoint);
            channel = channelFactory.CreateChannel();
        }
    }
}
