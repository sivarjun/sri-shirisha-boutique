import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { CustomerDataService } from './customer/customer-data.service';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { OrdersListComponent } from './orders/orders-list.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerListComponent,
    EditCustomerComponent,
    CustomerDetailComponent,
    OrdersListComponent,
    CreateOrderComponent
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CustomerDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
