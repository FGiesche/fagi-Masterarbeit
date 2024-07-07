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
    public class at_EventRegistrationRepository : RepositoryBase<At_EventRegistration, DataverseContext>
    {
        public at_EventRegistrationRepository(XrmContext<DataverseContext> context) : base(context)
        {
        }

        public at_EventRegistrationRepository(XrmContext<DataverseContext> context, ITracingService tracingService) : base(context, tracingService)
        {
        }
    }
}
