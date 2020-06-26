using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    /// <summary>
    /// Main controller of the application
    /// </summary>
    [AutoValidateAntiforgeryToken]
    public class HomeController : Controller
    {
        /// <summary>
        /// Sends the main page - index.html via GET
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            ViewBag.DevelopmetMode = ApplicationSettings.DevelopmetMode;
            return View(ViewBag);
        }
    }
}
