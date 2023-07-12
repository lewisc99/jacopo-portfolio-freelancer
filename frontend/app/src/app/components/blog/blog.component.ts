import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticlesDTO, PageModel } from 'src/app/domain/entities/article';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public loading:boolean = false;
  public articlesDTO!:ArticlesDTO;
  private lastPage:number = 0;
  private pageRequest = new PageModel();
  constructor(private articleService: ArticleService, private router:Router) {}
  
  ngOnInit(): void {
      this.loading = true;
      this.getAll();
  }

  public getAll(page?:number):void {

      if (page != null)
      {
        this.pageRequest.page = page!;
        this.pageRequest.size = 5;
      } else {
        this.pageRequest.page = 0;
        this.pageRequest.size = 5;
      }
      this.articleService.getAll(this.pageRequest).subscribe({
        next: data =>
        {
          this.loading = false;
          this.articlesDTO = data;
          this.addActivedPageEvent(page);
        }
      });
  }

  addActivedPageEvent(page?:number)
  {
    if (this.pageRequest.page != 0 && page != null)
    {
      document.getElementById('page-item-' + page)!.classList.toggle('active');
      if (this.lastPage != null)
        document.getElementById('page-item-' + this.lastPage)!.classList.remove('active');
      this.lastPage = page!;
    } else {
        document.getElementById('page-item-0')!.classList.add('active');
        document.getElementById('page-item-' + this.lastPage)!.classList.remove('active');
        this.lastPage = 0;
    }
  }

  public onDelete(id:string):void
  {
      this.loading = true;
      this.articleService.delete(id).subscribe({
        next: () => {
            this.loading = false;
            this.getAll();
        }
      })
  }

  public onUpdate(id:string):void {
    this.loading = true;
    this.router.navigate(["blog",id,"update"]);
    this.loading = false;
  }

  previousAndNextPaginated(isNext:boolean)
  {
    if(this.articlesDTO.totalPages > 0)
    {
      if (isNext)
      {
       if (this.pageRequest.page < this.articlesDTO.totalPages - 1)
        {
          this.pageRequest.page += 1;
          document.getElementById('next')!.classList.toggle('active');
          document.getElementById('previous')!.classList.remove('active');
        }
      } else {
        if (this.pageRequest.page > 0)
        {
          document.getElementById('previous')!.classList.toggle('active');
          document.getElementById('next')!.classList.remove('active');
          this.pageRequest.page -= 1;
        }
      }
      this.getAll(this.pageRequest.page);
    }
  }
  
}
