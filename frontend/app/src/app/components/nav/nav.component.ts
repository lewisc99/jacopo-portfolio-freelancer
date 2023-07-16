import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  loggedInSubscription: Subscription = new Subscription();
  idiomsSubscrition: Subscription = new Subscription();
  idiomsList: any[] = [];

  constructor(
    private tokenStorageService: TokenStorageService,
    private _loginService: LoginService,
    private router: Router,
    private _translate: TranslateService
  ) {
    this._translate.setDefaultLang('po');
  }

  ngOnDestroy(): void {
    this.loggedInSubscription.unsubscribe();
  }

  ngOnInit(): void {
    //will run every subscribe
    this.loggedInSubscription =
      this.tokenStorageService.isTokenValid$.subscribe(async (data: any) => {
        this.isLoggedIn = data;
      });

    this.idiomsSubscrition = this._translate.get('idioms').subscribe({
      next: (result) => (this.idiomsList = result)
    });
  }

  triggerLogout() {
    this._loginService.logout().subscribe({
      next: () => {
        this.router.navigate(['/../login']);
      },
      error: (error) => alert(error),
    });
  }
}
