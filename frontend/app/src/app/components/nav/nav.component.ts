import {  Component,  OnDestroy,  OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy{

  isLoggedIn:boolean = false;
  loggedInSubscription:Subscription = new Subscription();

  constructor(private tokenStorageService:TokenStorageService, private _loginService:LoginService, private router:Router) {}

  ngOnDestroy(): void {
   this.loggedInSubscription.unsubscribe();
  }

  ngOnInit(): void {
    //will run every subscribe
   this.loggedInSubscription = this.tokenStorageService.isTokenValid$.subscribe( async (data: any) => 
   {
    this.isLoggedIn = data
   });
  }

  triggerLogout() {
    this._loginService.logout().subscribe({
      next: () => 
      {
        this.router.navigate(["/../login"]);
      },
      error: (error) => alert(error)
    })
  }

}
