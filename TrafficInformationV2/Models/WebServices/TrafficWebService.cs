using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json.Linq;

namespace TrafikInformation.Models
{
    public class TrafficWebService : RestBaseFetcher
    {
        public IEnumerable<TrafficMessage> GetIncidents()
        {
            string rawJson;

            if (CachedData.HasValue("incidents"))
            {
                rawJson = CachedData.GetCache("incidents") as string;
            }
            else
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(BaseUrl + AsJson);

                using (var response = request.GetResponse())
                using (var reader = new StreamReader(response.GetResponseStream()))
                {
                    rawJson = reader.ReadToEnd();
                }

                //Saves json-string in cache for 10 min
                CachedData.SetCache("incidents", rawJson, 60);
            }


            //For development. Reads from local file
            //using (var reader = new StreamReader(HttpContext.Current.Server.MapPath("~/App_Data/messages.json")))
            //{
            //    rawJson = reader.ReadToEnd();
            //}
            //End

            var jObj = JObject.Parse(rawJson);

            return (from item in jObj["messages"]
                select new TrafficMessage(item)).OrderByDescending(m => m.CreatedDate).ToList();
        } 
    }
}
