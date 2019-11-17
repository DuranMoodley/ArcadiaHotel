using BootstrapSite1.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace BootstrapSite1.Controllers
{
    public class ClientController : Controller
    {
        List<Client> ClientList = new List<Client>();
        // GET: Client
        public ActionResult Index()
        {
            RetrieveClient();
            return View(ClientList);
        }

        public void RetrieveClient()
        {
            var request = (HttpWebRequest)WebRequest.Create("http://www.duran.dx.am/GetClient.php");

            var postData = "status=Pending";
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

            var jObject = JArray.Parse(newObjectStudent["clients"].ToString());


            foreach (var item in jObject)
            {
                Client client = new Client();
                client.Id = int.Parse(item["Id"].ToString());
                client.FullName = item["FullName"].ToString();
                client.Date = item["Date"].ToString();
                client.ContactNumber = item["ContactNumber"].ToString();
                client.Email = item["Email"].ToString();
                client.NumberOfPeople = item["NumOfPeople"].ToString();
                client.Status = item["Status"].ToString();
                ClientList.Add(client);
            }

        }
        // GET: Client/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Client/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Client/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Client/Edit/5
        public ActionResult Edit(int id, string name)
        {
            Client client = new Client();
            client.Id = id;
            client.FullName = name;
            return View(client);
        }

        // POST: Client/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, Client collection)
        {
            try
            {
                // TODO: Add update logic here
                UpdateClient(id, collection.Status);
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
        public void UpdateClient(int id, string status)
        {
            // var request = (HttpWebRequest)WebRequest.Create("http://www.duran.dx.am/UpdateEmployee.php?Id=25&name=MVC&surname=mvc");

            string postData = "Id=" + id + "&status=" + status;
            var request = (HttpWebRequest)WebRequest.Create("http://www.duran.dx.am/UpdateClient.php?" + postData);

            var response = (HttpWebResponse)request.GetResponse();
            var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
        }
        // GET: Client/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Client/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
