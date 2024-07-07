using at.Wordpress.Dataverse.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace at.Wordpress.Dataverse.Interface
{
    public interface IDataverseService
    {
        Contact GetContact(Guid contactId);
        Guid UpdateContact(Contact contactToUpdate);
        IEnumerable<At_Event> GetEvents();
        IEnumerable<At_EventRegistration> GetEventRegistrations(Guid contactId);
        Guid CreateEventRegistrations(Guid eventId, Guid contactId);
        Guid DeleteEventRegistrations(At_EventRegistration eventRegistration);
    }
}
