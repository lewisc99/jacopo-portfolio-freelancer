import { AfterViewInit, Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit{

  triggerLogout() {
  }
  ngAfterViewInit() {
  }
}
