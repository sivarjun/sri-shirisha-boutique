import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap,map} from 'rxjs/operators'


import { Customer } from './customer';
import { Blouse } from './blouse';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  constructor(private http:HttpClient) {

   }

getCustomers():Observable<Customer[]>
{
   return this.http.get<Customer[]>('http://localhost:62066/api/Customer');
}

getCustomer(id:number):Observable<Customer>
{

  

  return this.http.get<Customer>('http://localhost:62066/api/Customer/'+id)

.pipe(
  
    map((response: Customer) => 
    {
console.log(response);
      const customer: Customer = response;
      if(customer.BlouseMesurement==null)
      {
        customer.BlouseMesurement=new Blouse();
      }
      return customer;
    }),
    tap(data => console.log("From Service : "+ JSON.stringify(data)))
    
  );  


}

}
