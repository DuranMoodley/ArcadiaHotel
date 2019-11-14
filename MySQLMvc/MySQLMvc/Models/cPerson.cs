using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using MySql.Data.MySqlClient;
using System.Configuration;

namespace Razor.Models
{
    public class cPerson
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
       

        public cPerson()
        {

        }

    }
}