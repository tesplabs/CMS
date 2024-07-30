import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatableComponent } from './datatable/datatable.component';
import { AddComponentsComponent } from './add-components/add-components.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'datatable', component: DatatableComponent},
  { path: '', redirectTo: '/datatable', pathMatch: 'full' },
  // {path: 'login', component: LoginComponent},
  // {path:'', component: LoginComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export { routes };