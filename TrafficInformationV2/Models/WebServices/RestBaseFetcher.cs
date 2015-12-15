using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TrafficInformationV2.Models.WebServices;

namespace TrafikInformation.Models
{
    public class RestBaseFetcher
    {
        protected static string BaseUrl = "http://api.sr.se/api/v2/traffic/messages";
        protected static string AsJson = "?format=json";
        protected CachedData CachedData = new CachedData();
    }
}
