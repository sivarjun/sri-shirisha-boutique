import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerDataService } from '../customer-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Blouse } from '../blouse';
import { BotiqueError } from '../../shared/botique-error';
import { Form, NgForm } from '@angular/forms';

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
    }
    else {
      this.customerService.getCustomer(id).subscribe(
          (data:Customer) => {
          this.customer = data;
          console.log(data);
        },
        (err:BotiqueError) =>
        console.log(`Error code : ${err.ErrorNumber} , message : ${err.frndlyMessage}`)
      );
    }

    
  }

  SaveCustomer(customerData:NgForm)
  {
      console.log(this.customer);
    //  this.customer.BlouseMesurement.ItemId=1; 
      this.customerService.saveCusomer(this.customer)
      .subscribe(
        responce=>console.log(responce),
        (err:BotiqueError)=> console.log(err.frndlyMessage)
      
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }




}
