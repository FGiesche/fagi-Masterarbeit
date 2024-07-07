using at.D365.Core.DataAccess.Base;
using at.Wordpress.Dataverse.Types;
using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace at.Wordpress.Dataverse.Repositories
{
    public class ContactRepository : RepositoryBase<Contact, DataverseContext>
    {
        public ContactRepository(XrmContext<DataverseContext> context) : base(context)
        {
        }

        public ContactRepository(XrmContext<DataverseContext> context, ITracingService tracingService) : base(context, tracingService)
        {
        }
    }
}
