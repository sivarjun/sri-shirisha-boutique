import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerDataService } from '../customer-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Blouse } from '../blouse';
import { BotiqueError } from '../../shared/botique-error';
import { Form, NgForm } from '@angular/forms';
import { AlertToastrService } from '../../alert.toastr.service';
import { ViewChild } from '@angular/core';
import { fadeInAnimation } from '../../Animation/fade-in-animation';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
  animations:[fadeInAnimation]
})
export class EditCustomerComponent implements OnInit {
  customer: Customer = new Customer();
  id: number;
  errorMessage: any;
  @ViewChild('customerForm') form: any
exe='';
  disableSaveBtn: boolean = false;

  private sub: Subscription

  constructor(
    private customerService: CustomerDataService,
    private route: ActivatedRoute,
    private router: Router,
    private alert:AlertToastrService
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

this.exe='doAnimate';
  }

  getProduct(id: number) {
    if (id == 0) {
      this.customer = new Customer();
      this.form.reset();
    }
    else {
      this.route.data.subscribe(
        (data:{customerData: Customer}) => {
          this.customer = data.customerData;
          console.log(data);
        },
        (err: BotiqueError) =>
        {
          console.log(`Error code : ${err.ErrorNumber} , message : ${err.frndlyMessage}`)
          this.alert.Error(`Error code : ${err.ErrorNumber} , message : ${err.ErrorMessage}`)
        }
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
            this.alert.Success('Customer data saved successfully');
            this.router.navigate(['/customers'])
            this.disableSaveBtn = false;
          },
          (err: BotiqueError) =>{ 
            console.log(err.frndlyMessage);
            this.disableSaveBtn = false;
            this.alert.Error(`Error code : ${err.ErrorNumber} , message : ${err.frndlyMessage}`)
          }

        );
    }
    else {
      this.customerService.updateCusomer(this.customer)
        .subscribe(
          responce => {
            console.log(responce)
            this.alert.Success('Customer data saved successfully');
            this.router.navigate(['/customers']);
            this.disableSaveBtn = false;
          },
          (err: BotiqueError) => 
          {console.log(err.frndlyMessage)
            this.disableSaveBtn = false;
            this.alert.Error(`Error code : ${err.ErrorNumber} , message : ${err.ErrorMessage}`)
          }

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
