using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using MySql.Data.MySqlClient;
using System.Configuration;
using System.ComponentModel;

namespace Razor.Models
{
    public class cPerson
    {
        [DisplayName("Employee Number")]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Duty { get;  set; }
        [DisplayName("Contact Number")]
        public string ContactNumber { get;  set; }
        [DisplayName("Email Address")]
        public string EmailAddress { get;  set; }
        public string Status { get; set; }
        public string Shift { get; set; }

        public cPerson()
        {

        }

    }
}