import { Routes } from '@angular/router';
import { PublicComponent } from './components/public/public.component';
import { ContactComponent } from './components/contact/contact.component';
import { EventRegistrationComponent } from './components/event-registration/event-registration.component';

export const routes: Routes = [  
  { 
    path: "", 
    component: ContactComponent, 
    pathMatch: "full", 
  },
  { 
    path: "contact", 
    component: ContactComponent, 
    pathMatch: "full", 
  },
  { 
    path: "event-registration/:id", 
    component: EventRegistrationComponent, 
  }, 
];
