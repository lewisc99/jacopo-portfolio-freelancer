import { Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  idiomsSubscrition:Subscription = new Subscription();
  constructor(private _translate: TranslateService) {
    this._translate.setDefaultLang('po');
  }

}
