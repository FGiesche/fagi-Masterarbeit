using at.Wordpress.Dataverse.Implementation;
using at.Wordpress.Dataverse.Interface;
using at.Wordpress.WebApi.Constants;
using at.Wordpress.WebApi.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace at.Wordpress.WebApi.Controllers
{
    public class BaseController : ControllerBase
    {
        private string ContactIdClaim;
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;

        private IDataverseService dataverseService;

        public BaseController(IConfiguration configuration, ILogger logger)
        {
            _configuration = configuration;
            _logger = logger;
            ContactIdClaim = configuration.GetValue<string>(ConfigurationConstants.AzureAdB2C_ContactIdClaim);
        }

        protected Guid? GetContactId()
        {
            var contactIdClaim = User.Claims.FirstOrDefault(claim => claim.Type == this.ContactIdClaim);
            var contactIdString = contactIdClaim != null ? contactIdClaim.Value.ToString() : "";

            if (!string.IsNullOrWhiteSpace(contactIdString))
            {
                if (Guid.TryParse(contactIdString, out var contactId))
                {
                    _logger.LogInformation($"Benutzer '{User?.Identity?.Name}' hat eine ContactID. contactId: {contactId}");
                    return contactId;
                }
                else
                {
                    _logger.LogInformation($"Benutzer '{User?.Identity?.Name}' hat eine ContactID. Diese ist aber keine gültige GUID");
                }
            }
            _logger.LogInformation($"Benutzer '{User?.Identity?.Name}' hat keine ContactID.");

            return null;
        }

        protected IDataverseService GetDataverseService()
        {
            if (this.dataverseService == null)
            {
                this._logger.LogInformation($"dynamicsConfiguration wird eingelesen");
                var dataverseConfiguration = ConfigurationHelper.GetDataverseConfiguration(this._configuration);
                this._logger.LogInformation($"dynamicsConfiguration eingelesen mit BaseUrl: {dataverseConfiguration.BaseUrl}");
                this.dataverseService = new DataverseService(dataverseConfiguration, _logger);
            }

            return this.dataverseService;
        }
    }
}