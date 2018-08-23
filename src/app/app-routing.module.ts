import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';

const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'customer',component:CustomerListComponent},
  {path:'customer/:id',component:EditCustomerComponent},
  {path:'**',redirectTo:''}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
