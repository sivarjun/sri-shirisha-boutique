import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatNativeDateModule
  , MatFormFieldModule,MatInputModule,MatTableModule} from '@angular/material';

  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';

import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { OrdersListComponent } from './orders/orders-list.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { LoginComponent } from './user/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerListComponent,
    EditCustomerComponent,
    CustomerDetailComponent,
    OrdersListComponent,
    CreateOrderComponent,
    LoginComponent
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
