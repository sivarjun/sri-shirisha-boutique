import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'Sri Shirisha Boutique';

constructor(private http:HttpClient){

}
ngOnInit(): void {
  this.http.get<any[]>('http://localhost:59226/api/Customer')
  .subscribe(result=>console.log(result));
}
}
