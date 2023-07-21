import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('name', { static: false }) public name: ElementRef =
    new ElementRef({});
  @ViewChild('text', { static: false }) public text: ElementRef =
    new ElementRef({});
  public servicesList: any[] = [];
  public referencesList: any[] = [];
  lastIndex: number = 0;

  idiomsSubscrition: Subscription = new Subscription();
  constructor(private _translate: TranslateService) {
    this._translate.setDefaultLang('po');
  }
  ngOnInit(): void {
    this._translate.get('services.items').subscribe({
      next: (data) => {
        this.servicesList = data;
      },
    });
    this._translate.get('references.items').subscribe({
      next: (data) => {
        this.referencesList = data;
      },
    });
  }

  sendMessageWhatsapp() {
    let text = this.text.nativeElement.value;
    let name = this.name.nativeElement.value;

    let link = document.createElement('a');
    link.href = `https://api.whatsapp.com/send?phone=393480824374&text=*MENSAGEM ENVIADA PELO SITE*%20%20%20%20%20%0A%0A%20%20%20%20%0A%0A*name:*${name}%20%20%20%20%20%0A%0A*text:*${text}`;
    link.target = '_blank';
    link.click();
  }

  changeReference(isNext: boolean) {
    this.referencesList.forEach((item) => {
      document
        .getElementById('carousel-' + item.index)!
        .classList.add('visually-hidden');
    });

    if (isNext) {
      if (this.lastIndex < this.referencesList.length - 1) {
        this.lastIndex += 1;
        document
          .getElementById('carousel-' + this.lastIndex)!
          .classList.remove('visually-hidden');
      } else {
        document
          .getElementById('carousel-' + this.lastIndex)!
          .classList.remove('visually-hidden');
      }
    } else {
      if (!(this.lastIndex < 1)) {
        this.lastIndex -= 1;
        if (
          document
            .getElementById('carousel-' + this.lastIndex)
            ?.classList.contains('visually-hidden')
        ) {
          document
            .getElementById('carousel-' + this.lastIndex)!
            .classList.remove('visually-hidden');
        }
      } else {
        document
          .getElementById('carousel-' + this.lastIndex)!
          .classList.remove('visually-hidden');
      }
    }
  }
}
