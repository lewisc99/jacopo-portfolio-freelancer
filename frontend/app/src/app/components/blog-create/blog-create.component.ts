import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { ArticleRequest } from 'src/app/domain/entities/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent implements OnInit {
  public formGroup:FormGroup;
	public saving: boolean;
  public selectedFile:any;
  constructor(private fb:FormBuilder, private articleService:ArticleService, private router:Router) {}

  ngOnInit(): void {
     this.formGroup = this.fb.group({
      title:[''],
      text:[''],
      articleLink: [''],
      image: ['']
     })
  }

 
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.formGroup.patchValue({
      image: this.selectedFile
    });
  }

  onSubmit():void {

    if (!this.formGroup.invalid) {
      const formData = new FormData();
      formData.append('image', this.formGroup.get('image')!.value);
      formData.append('title', this.formGroup.get('title')!.value);
      formData.append('text', this.formGroup.get('text')!.value);
      formData.append('articleLink', this.formGroup.get('articleLink')!.value);
      this.saving = true;
      this.articleService.create(formData).subscribe({
        next: () => {
            this.saving = false;
            this.formGroup.reset();
            this.router.navigate(["../blog"]);
        },
      });
    } else {
      this.formGroup.markAllAsTouched();
      }
    }
}
