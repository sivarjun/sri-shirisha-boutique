import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'customers',component:CustomerListComponent},
  {path:'customers/:id',component:CustomerDetailComponent},
  {path:'customers/:id/edit',component:EditCustomerComponent},
  {path:'customers/:id/createorder',component:CreateOrderComponent},
  {path:'**',redirectTo:''}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
