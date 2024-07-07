using at.Wordpress.Dataverse.Types;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace at.Wordpress.WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
    public class EventRegistrationController : BaseController
    {
        private readonly ILogger<ContactController> _logger;

        public EventRegistrationController(IConfiguration configuration, ILogger<ContactController> logger) : base(configuration, logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetEventRegistration")]
        public IEnumerable<At_EventRegistration> EventRegistration()
        {
            var dataverseService = this.GetDataverseService();
            var contactId = this.GetContactId();

            if (contactId == null || !contactId.HasValue)
            {
                throw new ArgumentNullException("ContactID darf nicht leer sein.");
            }

            return dataverseService.GetEventRegistrations(contactId.Value);
        }

        [HttpPost(Name = "CreateEventRegistration")]
        public Guid CreateEventRegistration(Guid eventId)
        {
            var dataverseService = this.GetDataverseService();
            var contactId = this.GetContactId();

            if (contactId == null || !contactId.HasValue)
            {
                throw new ArgumentNullException("ContactID darf nicht leer sein.");
            }

            return dataverseService.CreateEventRegistrations(eventId, contactId.Value);
        }

        [HttpDelete(Name = "DeleteEventRegistration")]
        public Guid DeleteEventRegistration(At_EventRegistration eventRegistrationPatch)
        {
            var dataverseService = this.GetDataverseService();
            var contactId = this.GetContactId();

            if (contactId == null || !contactId.HasValue)
            {
                throw new ArgumentNullException("ContactID darf nicht leer sein.");
            }

            var allowedEventRegistrations = dataverseService.GetEventRegistrations(contactId.Value);
            var eventRegistration = allowedEventRegistrations.FirstOrDefault(eventReg => eventReg.Id == eventRegistrationPatch.Id);

            if (eventRegistration == null)
            {
                throw new ArgumentNullException($"EventRegistration mit der ID '{eventRegistrationPatch}' ist nicht zulässig.");
            }

            return dataverseService.DeleteEventRegistrations(eventRegistrationPatch);
        }
    }
}
