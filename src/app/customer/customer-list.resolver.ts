import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Customer } from './customer';
import { CustomerDataService } from './customer-data.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BotiqueError } from '../shared/botique-error';


@Injectable({
    providedIn: 'root'
})
export class CustomerListResolver implements Resolve<Customer[] | BotiqueError>{

    constructor(private customerService: CustomerDataService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):

        Observable<Customer[] | BotiqueError> {

        return this.customerService.getCustomers().pipe(
            map(customers => {
                if (customers) {
                    return customers;
                } else { // id not found
                    this.router.navigate(['/home']);
                    return null;
                }
            })
        );
    }
}

@Injectable({
    providedIn: 'root'
})
export class CustomerResolver implements Resolve<Customer | BotiqueError>{

    constructor(private customerService: CustomerDataService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):

        Observable<Customer | BotiqueError> {
        let id = +route.paramMap.get('id');
        if (id == 0)
            return of(new Customer());
        else
            return this.customerService.getCustomer(id).pipe(
                map(customer => {
                    if (customer) {
                        return customer;
                    } else { // id not found
                        this.router.navigate(['/home']);
                        return null;
                    }
                })
            );
    }
}