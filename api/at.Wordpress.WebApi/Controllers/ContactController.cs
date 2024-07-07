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
    public class ContactController : BaseController
    {
        private readonly ILogger<ContactController> _logger;

        public ContactController(IConfiguration configuration, ILogger<ContactController> logger) : base(configuration, logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetContact")]
        public Contact Get()
        {
            var dataverseService = this.GetDataverseService();
            var contactId = this.GetContactId();

            if (contactId == null || !contactId.HasValue)
            {
                throw new ArgumentNullException("ContactID darf nicht leer sein.");
            }

            return dataverseService.GetContact(contactId.Value);
        }

        [HttpPatch(Name = "PatchContact")]
        public Guid Patch(Contact contact)
        {
            var dataverseService = this.GetDataverseService();
            var contactId = this.GetContactId();

            if (contactId == null || !contactId.HasValue)
            {
                throw new ArgumentNullException("ContactID darf nicht leer sein.");
            }

            contact.Id = contactId.Value;

            return dataverseService.UpdateContact(contact);
        }
    }
}
