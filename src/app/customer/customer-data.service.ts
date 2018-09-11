import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, delay,catchError } from 'rxjs/operators';



import { Customer } from './customer';
import { Blouse } from './blouse';
import { BotiqueError } from '../shared/botique-error';
import { CustomeHttpErrorService } from '../custome-http-error.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  constructor(private http: HttpClient, private customeError:CustomeHttpErrorService) { }

  getCustomers(): Observable<Customer[] | BotiqueError> {
    return this.http.get<Customer[]>('http://localhost:62066/api/Customer')
      .pipe(
        delay(500),
        tap(data => console.log("From Service : " + JSON.stringify(data))),
        catchError(err => this.customeError.handleHttpError(err))
      )
  }

  getCustomer(id: number): Observable<Customer | BotiqueError> {
    return this.http.get<Customer>('http://localhost:62066/api/Customer/' + id)
      .pipe(
        delay(500),
        map((response: Customer) => {
          const customer: Customer = response;
          return customer;
        }),
        tap(data => console.log("From Service : " + JSON.stringify(data))),
        catchError(err => this.customeError.handleHttpError(err))

      );


  }

      saveCusomer(customer: Customer) : Observable<Customer | BotiqueError> {
        customer.CustomerId=null;
        
        return this.http.post<Customer>
        ('http://localhost:62066/api/Customer',customer)
        .pipe(
          tap(data => console.log("From Service : " + JSON.stringify(data))),
          catchError(err => this.customeError.handleHttpError(err))

        );
  }

  updateCusomer(customer: Customer) : Observable<Customer | BotiqueError> {
        
    return this.http.put<Customer>
    ('http://localhost:62066/api/Customer/'+customer.CustomerId, customer)
    .pipe(
      tap(data => console.log("From Service : " + JSON.stringify(data))),
      catchError(err => this.customeError.handleHttpError(err))

    );
}




}
