import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer/customer';
import { RouterEvent } from '@angular/router';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { NavigationCancel } from '@angular/router';
import { NavigationError } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Sri Shirisha Boutique';
  color = 'warn';
  loading = false;
  constructor(private router: Router) {
    this.router.events.subscribe(
      (routerEvent: RouterEvent) => {
        this.checkRouterEvent(routerEvent);
      }
    )
  }

  private checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  ngOnInit(): void {

  }
  show = false;
  toggle() {
    this.show = !this.show;
  }
}
