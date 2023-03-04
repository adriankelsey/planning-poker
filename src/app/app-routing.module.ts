import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login-component/login.component';
import { MainComponent } from './main-component/main.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'table', component: MainComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
