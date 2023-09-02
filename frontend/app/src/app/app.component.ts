import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from './services/token-storage.service';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { last } from 'rxjs/operators';
import { FuseTranslationLoaderService } from './services/translation-loader.service';
import { localeEn } from 'src/assets/i18n/en';
import { localeEs } from 'src/assets/i18n/es';
import { localeIt } from 'src/assets/i18n/it';
import { localePo } from 'src/assets/i18n/po';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loggedInSubscription: Subscription = new Subscription();

  constructor(
    private _translate: TranslateService,
    private _tokenStorageService: TokenStorageService,
    private router: Router,
    private _translateService: TranslateService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService
  ) {
    this._translateService.addLangs(['en', 'po', 'es', 'it']);
    this._translateService.setDefaultLang('en');
    this._fuseTranslationLoaderService.loadTranslations(
      localeEn,
      localeIt,
      localePo,
      localeEs
    );
    this._translateService.use('en');
  }
  ngOnDestroy(): void {
    this.loggedInSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this._tokenStorageService.isTokenValid$.subscribe(async (result) => {
      if (result) {
        this._tokenStorageService.isTokenExpired();
        let tokenExpirationTime = this._tokenStorageService.expirationTime;
        const timeoutId = setTimeout(() => {
          this._tokenStorageService.cleanToken();
          this.router.navigate(['../login']);
          alert('Token is Expired');
        }, tokenExpirationTime);

        setTimeout(() => {
          clearTimeout(timeoutId);
        }, tokenExpirationTime);
      }
    });
  }

  title = 'app';
}
