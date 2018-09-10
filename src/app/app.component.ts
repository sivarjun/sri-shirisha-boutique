import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Customer } from './customer/customer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'Sri Shirisha Boutique';

constructor(){

}
ngOnInit(): void {
 
}
show=false;
toggle()
{
     this.show=!this.show;
}
}
