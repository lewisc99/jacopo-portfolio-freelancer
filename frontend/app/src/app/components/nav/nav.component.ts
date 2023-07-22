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
  ) {}

  ngOnDestroy(): void {
    this.loggedInSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initializeIdiom();
  }

  initializeIdiom() {
    //will run every subscribe
    this.loggedInSubscription =
      this.tokenStorageService.isTokenValid$.subscribe(async (data: any) => {
        this.isLoggedIn = data;
      });
    
    this.idiomsSubscrition = this._translate.get('idioms').subscribe({
      next: (result) => (this.idiomsList = result),
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

  toggleIdiom(target?: any): void {
    if (!Number.isNaN(target.value)) {
      switch (target.value) {
        case '0': {
          this._translate.use('po');
          this.initializeIdiom();
          break;
        }
        case '1': {
          this._translate.use('en');
          this.initializeIdiom();
          break;
        }
        case '2': {
          this._translate.use('es');
          this.initializeIdiom();
          break;
        }
        case '3': {
          this._translate.use('it');
          this.initializeIdiom();
          break;
        }
      }
    }
  }
}
