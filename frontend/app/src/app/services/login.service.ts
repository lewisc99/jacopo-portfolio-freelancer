import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment.test';
import { Login } from '../domain/entities/login';
import { TokenDto } from '../domain/dtos/tokenDto';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private fullURL = environment.article_URL;

  constructor(private httpClient:HttpClient, private router:Router) { }

  public login(login:Login): Observable<TokenDto>
  {
     let loginURL = this.fullURL + "login"
      return this.httpClient.post<TokenDto>(loginURL, login).pipe
      (
          map(
            (response:TokenDto) => {
              // this.tokenStorage.saveToken(response);
              return response;
            }
          ), catchError( (error:HttpErrorResponse) => {
            return throwError( () =>  this.handleErrorException(error));
          }));
  }

  public logout(): Observable<any>
  {
    let logoutURL = this.fullURL + "logout";
    return this.httpClient.post(logoutURL,{}).pipe(
      
      catchError(error => throwError(() => this.handleErrorException(error)))
    )
  }

  private handleErrorException(error:HttpErrorResponse): string
  {
    var errorMessage = "";
    switch (error.status)
    {
      case 401:
        errorMessage = "Employee lacks valid authentication credentials please verify the email or password";
        break;
      case 404:
        errorMessage = "Employee Not found";
        break;
      case 500:
        errorMessage = "Unknown error was thrown";
    }
    return errorMessage;
  }

}

