import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerDataService } from '../customer-data.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  disableSaveBtn: boolean = false;

  private sub: Subscription

  constructor(
    private customerService: CustomerDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    console.log("1 From constructor");

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        console.log("2 From ngOnInit");
        this.getProduct(this.id);
      });


  }

  getProduct(id: number) {
    if (id == 0) {
      this.customer = new Customer();
    }
    else {
      this.customerService.getCustomer(id).subscribe(
        (data: Customer) => {
          this.customer = data;
          console.log(data);
        },
        (err: BotiqueError) =>
          console.log(`Error code : ${err.ErrorNumber} , message : ${err.frndlyMessage}`)
      );
    }


  }

  SaveCustomer(customerData: NgForm) {
    this.disableSaveBtn = true;
    console.log(this.customer);

    if (this.id == 0) {
      this.customerService.saveCusomer(this.customer)
        .subscribe(
          responce => {
            console.log(responce)
            this.router.navigate(['/customers'])
            this.disableSaveBtn = false;
          },
          (err: BotiqueError) => console.log(err.frndlyMessage)

        );
    }
    else {
      this.customerService.updateCusomer(this.customer)
        .subscribe(
          responce => {
            console.log(responce)
            this.router.navigate(['/customers']);
            this.disableSaveBtn = false;
          },
          (err: BotiqueError) => console.log(err.frndlyMessage)

        );
    }

  }

  GetCustomers(){
    this.router.navigate(['/customers']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }




}
