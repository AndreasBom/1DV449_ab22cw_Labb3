using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.UI;
using TrafikInformation.Models;

namespace TrafficInformationV2.Controllers
{
    public class TrafficIncidentController : Controller
    {

        // GET: TrafficIncidents
        public ActionResult Index()
        {
            var webService = new TrafficWebService();
            var model = webService.GetIncidents();
            return View(model);
        }

        
        public ActionResult GetModelData()
        {
            var webService = new TrafficWebService();
            var model = webService.GetIncidents();
            var json = new JavaScriptSerializer().Serialize(model);

            return Json(json, JsonRequestBehavior.AllowGet);
            
        }
    }
}