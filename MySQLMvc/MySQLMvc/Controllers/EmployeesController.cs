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
    public class EmployeesController : Controller
    {
        List<cPerson> cPersonList = new List<cPerson>();

        // GET: Employees
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
        // GET: Employees/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Employees/Create
        public ActionResult Create()
        {
            return View();
        }

        public void SaveEmployee(string name,string surname)
        {
            //http://duran.dx.am/SaveEmployee.php?name=John&surname=Doe
            var request = (HttpWebRequest)WebRequest.Create("http://www.duran.dx.am/SaveEmployee.php?");

            var postData = "name="+name+"&surname="+surname;
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
        }
        // POST: Employees/Create
        [HttpPost]
        public ActionResult Create(cPerson collection)
        {
            if (ModelState.IsValid)
            {
                SaveEmployee(collection.Name, collection.Surname);
                return RedirectToAction("Index");
            }
            else
            {
                return View(collection);
            }
        }

        public void UpdateEmployee(int id, string name, string surname)
        {
            var request = (HttpWebRequest)WebRequest.Create("http://www.duran.dx.am/UpdateEmployee.php?");

            var postData = "EmployeeId="+ id +"&name=" + name + "&surname=" + surname;
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
        }
        // GET: Employees/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Employees/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, cPerson collection)
        {
            try
            {
                // TODO: Add update logic here
                UpdateEmployee(id, collection.Name, collection.Surname); 
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Employees/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Employees/Delete/5
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
