import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "src/app/services/token-storage.service";




@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenStorage:TokenStorageService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token:string  = this.tokenStorage.getToken();
    
    if (token == "")
    {
       return next.handle(request);
    }
    else
    {

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json',
        },
      });
      return next.handle(request);
    }
  }
}