using Newtonsoft.Json.Linq;
using Razor.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace MySQLMvc.Controllers
{
    public class HomeController : Controller
    {

        List<cPerson> cPersonList = new List<cPerson>();

        public ActionResult Index()
        {
            RetrieveEmployees();
            return View(cPersonList);
        }

        public void RetrieveEmployees()
        {
            var request = (HttpWebRequest)WebRequest.Create("http://www.duran.dx.am/GetEmployees.php");

            var postData = "n=42&s=string value";
            var data = Encoding.ASCII.GetBytes(postData);

            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = data.Length;

            using (var stream = request.GetRequestStream())
            {
                stream.Write(data, 0, data.Length);
            }

            var response = (HttpWebResponse)request.GetResponse();
            var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();

            JObject newObjectStudent = JObject.Parse(responseString);

            var jObject = JArray.Parse(newObjectStudent["employees"].ToString());
            

            foreach (var item in jObject)
            {
                cPerson cPerson = new cPerson();
                cPerson.Id = int.Parse(item["EmployeeId"].ToString());
                cPerson.Name = item["Name"].ToString();
                cPerson.Surname = item["Surname"].ToString();
                cPersonList.Add(cPerson);
            }

        }

        //public FileContentResult GetImage()
        //{
        //    if (myPerson.Photo != null)
        //    {
        //        return File(myPerson.Photo, "jpg");
        //    }
        //    else
        //    {
        //        return null;
        //    }
        //}
    }
}