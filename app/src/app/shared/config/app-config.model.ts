export interface IAppConfig {
    logging: {
      console: boolean;
    },
    azure: {
      applicationId: string;
      tenantId: string;
      b2c: {
        clientId: string;
        signUpSignInFlow: string;
        signUpSignInAuthority: string;
        authorityDomain: string;
      }
    },
    api:{
      url: string;
      scope: string;
    },
    version: string;
  }
  