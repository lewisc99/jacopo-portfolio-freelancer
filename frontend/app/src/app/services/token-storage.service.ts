import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { TokenDto } from '../domain/dtos/tokenDto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private storageToken: Storage = localStorage;
  public isTokenValid$: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  public expirationTime = 0;
  getPopupSource() {
    return this.isTokenValid$.asObservable();
  }

  constructor() {
    this.getToken();
    this.isTokenValid$.next(false);
  }

  public saveToken(token: TokenDto) {
    this.storageToken.setItem('token', JSON.stringify(token));
    this.isTokenValid$.next(true);
  }

  private autoLogout(token: TokenDto) {
    let currentDate = Date.now();
    let expirationDate = token.expirationToken;
    if (currentDate >= expirationDate) {
      this.cleanToken();
    }
  }

  isTokenExpired() {
    let currentDate = Date.now();
    let token: TokenDto = JSON.parse(this.storageToken.getItem('token')!);
    if (token != null || token != undefined) {
      let expirationDate = token.expirationToken;
      this.expirationTime = expirationDate - currentDate;
      return currentDate > expirationDate;
    }
    return 0;
  }

  public getToken(): string {
    let token: TokenDto = JSON.parse(this.storageToken.getItem('token')!);
    if (token == null) {
      this.isTokenValid$.next(false);
      return '';
    } else {
      this.autoLogout(token);
      this.isTokenValid$.next(true);
      return token.token;
    }
  }

  public cleanToken(): void {
    this.storageToken.removeItem('token');
    this.isTokenValid$.next(false);
  }
}
