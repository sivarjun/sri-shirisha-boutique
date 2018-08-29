import { Component, OnInit } from '@angular/core';


import { Customer } from './customer';
import { CustomerDataService } from './customer-data.service';
import { BotiqueError } from '../shared/botique-error';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  
  customers:Customer[];
  filteredCustomers:Customer[];

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCustomers = this.listFilter ? this.performFilter(this.listFilter) : this.customers;
  }


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
  }

  performFilter(filterBy: string): Customer[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.customers.filter((customer: Customer) =>
    customer.Name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

}
