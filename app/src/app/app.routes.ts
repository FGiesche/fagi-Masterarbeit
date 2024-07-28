import { Routes } from '@angular/router';
import { PublicComponent } from './components/public/public.component';

export const routes: Routes = [  
{ 
    path: "", 
    component: PublicComponent, 
    pathMatch: "full", 
  }
];
