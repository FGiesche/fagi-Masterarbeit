using at.D365.Core.DataAccess.Contracts;
using at.Wordpress.Dataverse.Configuration;
using at.Wordpress.Dataverse.Interface;
using at.Wordpress.Dataverse.Repositories;
using at.Wordpress.Dataverse.Types;
using Microsoft.Crm.Sdk.Messages;
using Microsoft.Extensions.Logging;
using Microsoft.PowerPlatform.Dataverse.Client;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace at.Wordpress.Dataverse.Implementation
{
    public class DataverseService : IDataverseService
    {
        private IOrganizationService organizationService;
        ILogger logger;
        IUnitOfWork unitOfWork;
        ContactRepository contactRepository;
        at_EventRepository at_EventRepository;
        at_EventRegistrationRepository at_EventRegistrationRepository;

        public DataverseService(DataverseConfiguration dataverseConfiguration, ILogger logger)
        {
            this.logger = logger;
            this.organizationService = GetServiceClient(dataverseConfiguration);
            this.unitOfWork = new UnitOfWork.UnitOfWork(this.organizationService);
            this.contactRepository = unitOfWork.GetRepository<ContactRepository>();
            this.at_EventRepository = unitOfWork.GetRepository<at_EventRepository>();
            this.at_EventRegistrationRepository = unitOfWork.GetRepository<at_EventRegistrationRepository>();
        }

        public Contact GetContact(Guid contactId)
        {
            return contactRepository.GetById(contactId, c => new string[] { nameof(Contact.FirstName), nameof(Contact.LastName), nameof(Contact.Birthdate), nameof(Contact.Telephone1), nameof(Contact.MobilePhone), nameof(Contact.EmailAddress1), nameof(Contact.Address1_Line1), nameof(Contact.Address1_Line2), nameof(Contact.Address1_PostalCode), nameof(Contact.Address1_City), nameof(Contact.Address1_Country) });
        }

        public Guid UpdateContact(Contact contactToUpdate)
        {
            contactRepository.Update(contactToUpdate, true);
            return contactToUpdate.Id;
        }

        public IEnumerable<At_Event> GetEvents()
        {
            return at_EventRepository.GetAll();
        }

        public IEnumerable<At_EventRegistration> GetEventRegistrations(Guid contactId)
        {
            return at_EventRegistrationRepository.Get(eventRegistration => eventRegistration.At_Contact != null && eventRegistration.At_Contact.Id == contactId);
        }

        public Guid CreateEventRegistrations(Guid eventId, Guid contactId)
        {
            var createdEventRegistration = new At_EventRegistration();
            createdEventRegistration.At_Event = new EntityReference(At_Event.EntityLogicalName, eventId);
            createdEventRegistration.At_Contact = new EntityReference(Contact.EntityLogicalName, contactId);

            this.at_EventRegistrationRepository.Add(createdEventRegistration, true);
            return createdEventRegistration.Id;
        }

        public Guid DeleteEventRegistrations(At_EventRegistration eventRegistration)
        {
            this.at_EventRegistrationRepository.Delete(eventRegistration);
            return eventRegistration.Id;
        }

        private ServiceClient GetServiceClient(DataverseConfiguration dataverseConfiguration)
        {
            var serviceClient = new ServiceClient(new Uri(dataverseConfiguration.BaseUrl), dataverseConfiguration.ClientId, dataverseConfiguration.ClientSecret, false, this.logger);

            var userid = ((WhoAmIResponse)serviceClient.Execute(new WhoAmIRequest())).UserId;
            this.logger.LogDebug($"Serviceclient Initialisiert mit UserID = {userid}");

            return serviceClient;
        }
    }
}
