import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { FeedbackComponent } from './feedback';
import { NewTableComponent } from './new-table/new-table.component';
import { RegisterComponent } from './register/register.component'
import { TablesComponent } from './tables/tables.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: 'newTable', component: NewTableComponent },
    { path: 'tables', component: TablesComponent },
    


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
