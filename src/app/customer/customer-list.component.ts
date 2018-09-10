import { Component, OnInit } from '@angular/core';


import { Customer } from './customer';
import { CustomerDataService } from './customer-data.service';
import { BotiqueError } from '../shared/botique-error';
import { fadeInAnimation } from '../Animation/fade-in-animation';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  animations:[fadeInAnimation]
})
export class CustomerListComponent implements OnInit {
  
  customers:Customer[];
  filteredCustomers:Customer[];
  exe=''

  _listFilter = '';
  
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCustomers = this.listFilter ? this.performFilter(this.listFilter) : this.customers;
  }


  displayedColumns: string[] = ['CustomerId','Name','Phone','Edit','Order'];
 

 /*  'Address', 'BlouseMesurement',
  'CustomerId', 'Gender', 'IsDeleted', */

  constructor(private customerData:CustomerDataService) { }

  ngOnInit() {
    this.customerData.getCustomers()
    .subscribe((data:Customer[])=> {
      this.customers=data;
      this.filteredCustomers=this.customers;
     
      console.log(this.customers );},
      (err:BotiqueError)=>
      console.log(`Error code : ${err.ErrorNumber}, Message : ${err.frndlyMessage}`)
    
    );
    this.exe='doAnimate';
  }

  performFilter(filterBy: string): Customer[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.customers.filter((customer: Customer) =>
    customer.Name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

}
