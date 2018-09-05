import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './customer/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }


getItems():Observable<Item[]>
{
  return this.http.get<Item[]>('http://localhost:62066/api/Items');
}


}
