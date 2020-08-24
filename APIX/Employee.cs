using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace APIX{
    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }

        [WebMethod]
        public List<Employee> GetEmpList()
        {
            var empList = new List<Employee>()
            {
                 new Employee { ID=1, Name="Manas"},
                 new Employee { ID=2, Name="Tester"}
            };
            return empList;
        }

        [WebMethod]
        public string get()
        {            
            return "hola";
        }
    }
}