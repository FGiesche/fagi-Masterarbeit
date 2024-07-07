using at.D365.Core.DataAccess.Base;
using at.D365.Core.DataAccess.Contracts;
using at.Wordpress.Dataverse.Types;
using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace at.Wordpress.Dataverse.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        #region Properties

        protected XrmContext<DataverseContext> Context { get; private set; }

        #endregion

        #region constructor

        /// <summary>
        /// Initializes a new instance of the <see cref="UnitOfWork"/> class.
        /// </summary>
        /// <param name="service">the OrganizationService instance from the plugins localcontext.</param>
        /// <param name="tracing">The tracing service implementation from the plugins local context.</param>
        public UnitOfWork(IOrganizationService service, ITracingService tracing = null)
        {
            if (tracing == null)
            {
                Context = new XrmContext<DataverseContext>(service);
            }
            else
            {
                Context = new XrmContext<DataverseContext>(service, tracing);
            }
        }

        /// <summary>
        /// Initializes a new instance of the XrmContext.
        /// </summary>
        /// <param name="context"></param>
        public UnitOfWork(XrmContext<DataverseContext> context)
        {
            Context = new XrmContext<DataverseContext>(context.OrganizationService);
        }

        #endregion

        #region Repositories

        /// <summary>
        /// Delivers the repository of the provided type, instantiated wth the current XrmContext
        /// </summary>
        /// <typeparam name="T">type of requested respository</typeparam>
        /// <returns>new instance of the requested repository</returns>
        /// <exception cref="System.Collections.Generic.KeyNotFoundException">T</exception>
        public T GetRepository<T>()
        {
            var constructor = typeof(T).GetConstructor(new Type[] { typeof(XrmContext<DataverseContext>), typeof(ITracingService) });

            if (constructor != null)
                return (T)constructor.Invoke(new object[] { this.Context, this.Context.Tracing });

            throw new KeyNotFoundException($"No matching Repository implementation found for: {nameof(T)}");
        }

        #endregion        

        /// <summary>
        /// Commits all changes in teh XrmContext to the Crm
        /// </summary>
        public SaveChangesResultCollection Commit()
        {
            return Context.ServiceContext.SaveChanges();
        }

        public Guid GetSystemUserId(string domainName, bool throwError = false)
        {
            var systemuser = Context.ServiceContext.SystemUserSet.FirstOrDefault(x => x.DomainName == domainName);

            if (systemuser != null)
            {
                return systemuser.Id;
            }

            if (throwError)
                throw new KeyNotFoundException($"No matching SystemUser found for: {domainName}");

            return Guid.Empty;
        }

        #region IDisposable

        private bool _disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    Context.ServiceContext.Dispose();
                }
            }
            this._disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public string GetEnvironmentVariable(string displayName, bool throwError = false)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
