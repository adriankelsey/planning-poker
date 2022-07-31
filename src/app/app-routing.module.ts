import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'table', component: TableComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);