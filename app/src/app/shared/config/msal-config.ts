import {
    MsalGuardConfiguration,
    MsalInterceptorConfiguration,
    ProtectedResourceScopes,
  } from "@azure/msal-angular";
  import {
    BrowserCacheLocation,
    EndSessionRequest,
    InteractionType,
    IPublicClientApplication,
    LogLevel,
    PublicClientApplication,
    RedirectRequest,
  } from "@azure/msal-browser";
import { AppConfig } from "./app.config";
  

  const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

  export function loggerCallback(logLevel: LogLevel, message: string) {
    console.log(message);
  }
  
  export function MSALInstanceFactory(): IPublicClientApplication {
    return new PublicClientApplication({
      auth: {
        clientId: AppConfig.settings.azure.b2c.clientId, 
        authority: AppConfig.settings.azure.b2c.signUpSignInAuthority,
        knownAuthorities: [AppConfig.settings.azure.b2c.authorityDomain],
        redirectUri: `/`, // This is your redirect URI,
        postLogoutRedirectUri: location.origin,
      },
      cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: isIE, // set to true for IE 11
      },
      system: {
        loggerOptions: {
          loggerCallback,
          logLevel: LogLevel.Info,
          piiLoggingEnabled: false,
        },
      },
    });
  }
  
  export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, Array<string | ProtectedResourceScopes>>([
      [AppConfig.settings.api.url, [AppConfig.settings.api.scope]]
    ]);
  
    return {
      interactionType: InteractionType.Redirect,
      protectedResourceMap,
    };
  }
  
  export function MSALGuardConfigFactory(): MsalGuardConfiguration {
    return {
      interactionType: InteractionType.Redirect,
      authRequest: InitRedirctRequest,
    };
  }
  
  export const InitRedirctRequest: RedirectRequest = {
    scopes: ["https://fagimasterarbeitb2c.onmicrosoft.com/f47ffc3b-f0eb-485a-89ae-5e549e3aeb71/access_as_user"]
  };
  