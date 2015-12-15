using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace TrafikInformation.Models
{
    public class TrafficMessage
    {
        public int Id { get; set; }
        public int Priority { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Title { get; set; }
        public string ExactLocation { get; set; }
        public string Description { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int Category { get; set; }
        public string SubCategory { get; set; }

        public TrafficMessage(JToken item)
        {
            Id = (int)item["id"];
            Priority = (int) item["priority"];
            CreatedDate = (DateTime) item["createddate"];
            Title = (string) item["title"];
            ExactLocation = (string) item["exactlocation"];
            Description = (string) item["description"];
            Latitude = (double) item["latitude"];
            Longitude = (double) item["longitude"];
            Category = (int) item["category"];
            SubCategory = (string) item["subcategory"];
        }
    }
}
