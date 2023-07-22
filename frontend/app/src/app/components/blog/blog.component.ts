import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticlesDTO, PageModel } from 'src/app/domain/entities/article';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { Subscription, takeLast } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public articlesDTO!: ArticlesDTO;
  private lastPage: number = 0;
  private pageRequest = new PageModel();
  public isLoggedOut = false;
  public notificationMessage: string = '';
  public isNotificationHidden = true;
  private createNotificationSubscription: Subscription;
  intervalTime: any;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private _tokenService: TokenStorageService,
    private titleService: Title,
    private _notificationService: NotificationService
  ) {
    this.titleService.setTitle('Blog');
  }
  ngOnDestroy(): void {
    this.createNotificationSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    this.getAll();
    this._tokenService.isTokenValid$.subscribe(
      async (result) => (this.isLoggedOut = !result)
    );
    this.createNotificationSubscription = new Subscription();
    this.triggerSubscription();
  }

  triggerSubscription(): void {
    this.createNotificationSubscription =
      this._notificationService.notificationMessage$.pipe().subscribe({
        next: async (data) => {
          if (data.type != null || data.type != undefined) {
            debugger;
            let count = 0;
            this.isNotificationHidden = false;
            this.notificationMessage = data.message;
            this.intervalTime = setInterval(async () => {
              count += 1;
              document.getElementById('line-item')!.style.width = count + '%';
              if (count == 100) {
                clearInterval(this.intervalTime);
                this.isNotificationHidden = true;
              }
            }, 20);
          }
        },
      });
  }

  public getAll(page?: number): void {
    if (page != null) {
      this.pageRequest.page = page!;
      this.pageRequest.size = 5;
    } else {
      this.pageRequest.page = 0;
      this.pageRequest.size = 5;
    }
    this.articleService.getAll(this.pageRequest).subscribe({
      next: (data) => {
        this.loading = false;
        this.articlesDTO = data;
        this.addActivedPageEvent(page);
      },
    });
  }

  addActivedPageEvent(page?: number) {
    if (page != null || page != undefined) {
      if (page >= 0 && page < this.articlesDTO.totalPages) {
        document
          .getElementById('page-item-' + this.lastPage)!
          .classList.remove('active');
        document
          .getElementById('page-item-' + page)!
          .classList.toggle('active');
        this.lastPage = page;
      }
    }
  }

  public onDelete(id: string): void {
    this.loading = true;
    this.articleService.delete(id).subscribe({
      next: () => {
        this.loading = false;
        this.getAll();
      },
      error: (errorMessage) => alert(errorMessage),
    });
  }

  public onUpdate(id: string): void {
    this.loading = true;
    this.router.navigate(['blog', id, 'update']);
    this.loading = false;
  }

  previousAndNextPaginated(isNext: boolean) {
    if (this.articlesDTO.totalPages > 0) {
      if (isNext) {
        if (this.pageRequest.page < this.articlesDTO.totalPages - 1)
          this.pageRequest.page += 1;
      } else {
        if (this.pageRequest.page > 0) this.pageRequest.page -= 1;
      }
      this.getAll(this.pageRequest.page);
    }
  }
}
