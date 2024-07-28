import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_INITIALIZER, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app/app.routes';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalInterceptor, MsalService } from '@azure/msal-angular';
import { MSALGuardConfigFactory, MSALInstanceFactory, MSALInterceptorConfigFactory } from './app/shared/config/msal-config';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AppConfig } from './app/shared/config/app.config';
import { LogService } from './app/shared/services/log.service';
import { LayoutService } from './app/shared/services/layout.service';
import { AssetService } from './app/shared/services/asset.service';
import { UserService } from './app/shared/services/user.service';
import { licenseKey } from './devextreme-license';
import config from 'devextreme/core/config'; 
import { ContactService } from './app/shared/services/contact.service';
import { EventRegistrationService } from './app/shared/services/event-registration.service';
import { EventService } from './app/shared/services/event.service';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);


export function initializeAppConfig(appConfig: AppConfig) {
  return () => appConfig.load();
}

config({
  licenseKey: licenseKey
});

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: LOCALE_ID, 
      useValue: 'de-DE' 
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppConfig,
      deps: [AppConfig, Router],
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalService,
    MsalBroadcastService,
    MsalGuard,
    AppConfig,
    LogService,
    LayoutService,
    AssetService,
    UserService,
    ContactService,
    EventService,
    EventRegistrationService
  ],
})
  .catch((err) => console.error(err));
