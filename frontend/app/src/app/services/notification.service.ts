import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public notificationMessage$:BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor() { }

  successTopRight(type:string, message: string) {
		 this.notificationMessage$.next({
      type: type,
      message:message
     });
	}
}
