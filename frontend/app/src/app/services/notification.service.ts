import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationMessageSource: Subject<any> = new BehaviorSubject<any>(
    {}
  );
  public notificationMessage$ = this.notificationMessageSource.asObservable();
  constructor() {
    this.notificationMessageSource.asObservable();
  }

  successTopRight(type: string, message: string) {
    this.notificationMessageSource.next({
      type: type,
      message: message,
    });
  }
}
