import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticleDTO } from 'src/app/domain/entities/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {


  public articleList:ArticleDTO[];
  constructor(private articleService: ArticleService, private router:Router) {}
  
  ngOnInit(): void {
      this.getAll();
  }

  public getAll():void {
      this.articleService.getAll().subscribe({
        next: (data) =>
        {
          this.articleList = data;
        }
      });
  }

  public onDelete(id:string):void
  {
      this.articleService.delete(id).subscribe({
        next: () => {
            this.getAll();
        }
      })
  }

  public onUpdate(id:string):void {
    this.router.navigate(["blog",id,"update"]);
  }
}
