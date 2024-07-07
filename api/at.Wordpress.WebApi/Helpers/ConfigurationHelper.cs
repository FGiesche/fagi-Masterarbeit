using at.Wordpress.Dataverse.Configuration;
using at.Wordpress.WebApi.Constants;

namespace at.Wordpress.WebApi.Helpers
{
    public class ConfigurationHelper
    {
        public static DataverseConfiguration GetDataverseConfiguration(IConfiguration configuration)
        {
            var dataverseConfiguration = new DataverseConfiguration();

            dataverseConfiguration.TenantId = configuration.GetValue<string>(ConfigurationConstants.Dataverse_TenantId);
            dataverseConfiguration.BaseUrl = configuration.GetValue<string>(ConfigurationConstants.Dataverse_BaseUrl);
            dataverseConfiguration.ClientId = configuration.GetValue<string>(ConfigurationConstants.Dataverse_ClientId);
            dataverseConfiguration.ClientSecret = configuration.GetValue<string>(ConfigurationConstants.Dataverse_ClientSecret);

            return dataverseConfiguration;
        }
    }
}
