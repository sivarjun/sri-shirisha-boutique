import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BotiqueError } from './shared/botique-error';

@Injectable({
  providedIn: 'root'
})
export class CustomeHttpErrorService {

  constructor() { }


   handleHttpError(err: HttpErrorResponse): Observable<BotiqueError> {
    let dataError = new BotiqueError();
    dataError.ErrorNumber = 100;
    dataError.ErrorMessage = err.statusText;
    dataError.frndlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);
  }


}
