import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';  
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { RequestsComponent } from './requests/requests.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'dashboard-client', component: DashboardClientComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'requests', component: RequestsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];