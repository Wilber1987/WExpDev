using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;

namespace APIX
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }              
        [WebMethod]
        public static string Subscribe(string name, string email)
        {
            //Insert it to our database
            System.Threading.Thread.Sleep(3000);
            return "thanks " + name + ", your email " + email + " is subscribed to our newsletter.";
        }
    }
}
