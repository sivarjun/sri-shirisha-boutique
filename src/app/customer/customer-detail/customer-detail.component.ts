import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../customer';
import { CustomerDataService } from '../customer-data.service';
import { BotiqueError } from '../../shared/botique-error';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  customer:Customer;
  customerId:number;
  constructor(private route:ActivatedRoute, private customerData:CustomerDataService) { }

  ngOnInit() 
  {
      this.customerId=this.route.snapshot.params['id'];
      this.customerData.getCustomer(this.customerId)
      .subscribe(
       (data:Customer)=>this.customer=data,
       (err:BotiqueError)=>
       console.log(`Error code : ${err.ErrorNumber} ,
         message : ${err.frndlyMessage}`)
     );
  }

}
