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
    public class EventController : BaseController
    {
        private readonly ILogger<ContactController> _logger;

        public EventController(IConfiguration configuration, ILogger<ContactController> logger) : base(configuration, logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetEvents")]
        public IEnumerable<At_Event> Get()
        {
            var dataverseService = this.GetDataverseService();
            return dataverseService.GetEvents();
        }
    }
}
