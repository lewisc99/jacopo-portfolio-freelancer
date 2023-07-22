import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticlesDTO, PageModel } from 'src/app/domain/entities/article';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public loading: boolean = false;
  public articlesDTO!: ArticlesDTO;
  private lastPage: number = 0;
  private pageRequest = new PageModel();
  public isLoggedOut = false;
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private _tokenService: TokenStorageService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Blog');
  }

  ngOnInit(): void {
    this.loading = true;
    this.getAll();
    this._tokenService.isTokenValid$.subscribe(
      async (result) => (this.isLoggedOut = !result)
    );
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
