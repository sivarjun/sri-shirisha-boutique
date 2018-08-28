import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';

const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'customers',component:CustomerListComponent},
  {path:'customers/:id',component:CustomerDetailComponent},
  {path:'customers/:id/edit',component:EditCustomerComponent},
  {path:'**',redirectTo:''}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
