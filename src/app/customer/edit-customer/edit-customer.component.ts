import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerDataService } from '../customer-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Blouse } from '../blouse';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customer: Customer = new Customer();
  id: number;
  errorMessage: any;

  private sub: Subscription

  constructor(
    private customerService: CustomerDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getProduct(id);
      });
  }

  getProduct(id: number) {


    if (id == 0) {
      this.customer = new Customer();
      //this.customer.BlouseMesurements=Blouse[0];
    }
    else {
      this.customerService.getCustomer(id).subscribe(
        customer => {
          this.customer = customer;
          console.log(customer);
        },
        error => this.errorMessage = <any>error);
    }


  }





}
