import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';



import { Customer } from './customer';
import { Blouse } from './blouse';
import { BotiqueError } from '../shared/botique-error';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[] | BotiqueError> {
    return this.http.get<Customer[]>('http://localhost:62066/api/Customer')
      .pipe(
        tap(data => console.log("From Service : " + JSON.stringify(data))),
        catchError(err => this.handleHttpError(err))
      )
  }

  getCustomer(id: number): Observable<Customer | BotiqueError> {
    return this.http.get<Customer>('http://localhost:62066/api/Customer/' + id)
      .pipe(
        map((response: Customer) => {
          const customer: Customer = response;
          if (customer.BlouseMesurement == null) {
            customer.BlouseMesurement=new Blouse();
          }
          return customer;
        }),
        tap(data => console.log("From Service : " + JSON.stringify(data))),
        catchError(err => this.handleHttpError(err))

      );


  }

      saveCusomer(customer: Customer) : Observable<Customer | BotiqueError> {
        customer.CustomerId=null;
        
        return this.http.post<Customer>
        ('http://localhost:62066/api/Customer',customer)
        .pipe(
          tap(data => console.log("From Service : " + JSON.stringify(data))),
          catchError(err => this.handleHttpError(err))

        );
  }

  updateCusomer(customer: Customer) : Observable<Customer | BotiqueError> {
        
    return this.http.put<Customer>
    ('http://localhost:62066/api/Customer/'+customer.CustomerId, customer)
    .pipe(
      tap(data => console.log("From Service : " + JSON.stringify(data))),
      catchError(err => this.handleHttpError(err))

    );
}


  private handleHttpError(err: HttpErrorResponse): Observable<BotiqueError> {
    let dataError = new BotiqueError();
    dataError.ErrorNumber = 100;
    dataError.ErrorMessage = err.statusText;
    dataError.frndlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);
  }

}
