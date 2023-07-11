import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TokenDto } from "../domain/dtos/tokenDto";



@Injectable({
    providedIn: 'root'
})

  export class TokenStorageService {
  
    private storageToken:Storage = localStorage;
    public isTokenValid$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
    constructor() { 
    }
  
    public saveToken(token:TokenDto)
    {
      this.storageToken.setItem("token",JSON.stringify(token));
     
      this.isTokenValid$.next(true);
    }
  
    private autoLogout(token:TokenDto)
    {
      let currentDate = Date.now();
      let expirationDate = Date.parse(token.expirationToken);
      if (currentDate >= expirationDate)
      {
          this.cleanToken();
      }
    }
  
    public getToken():string 
    {
  
      let token:TokenDto = JSON.parse( this.storageToken.getItem("token")!);
      if ( token == null)
      {
          console.log(token);
          this.isTokenValid$.next(false);
          return "";
      }
      else
      {
        this.autoLogout(token);
        this.isTokenValid$.next(true);
        return token.token;
      }
    }
  
    public cleanToken():void
    {
       this.storageToken.removeItem("token");
       this.isTokenValid$.next(false);
    }
  
  }