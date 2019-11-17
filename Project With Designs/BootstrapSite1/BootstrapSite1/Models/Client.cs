using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace BootstrapSite1.Models
{
    public class Client
    {
        public int Id { get; set; }
        [DisplayName("Full Number")]
        public string FullName { get; set; }
        [DisplayName("Contact Number")]
        public string ContactNumber { get; set; }
        public string Email { get; set; }
        [DisplayName("Number of People")]
        public string NumberOfPeople { get; set; }
        public string Status { get; set; }
        public string Date { get; set; }

    }

    public enum BookingStatus
    {
        Approved,
        Pending,
        Decline
    }
}