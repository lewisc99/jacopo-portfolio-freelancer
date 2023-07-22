import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss'],
})
export class BlogCreateComponent implements OnInit , OnDestroy{
  public formGroup: FormGroup;
  public saving: boolean;
  public selectedFile: File;
  public imageValidation: string = '';
  private createSubscription: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private titleService: Title,
    private _notificationService:NotificationService
  ) {
    this.titleService.setTitle('create');
  }
  


  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      text: ['', [Validators.required, Validators.maxLength(300)]],
      articleLink: ['', [Validators.required, Validators.maxLength(200)]],
      image: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
     this.createSubscription.unsubscribe();
  }

  onFileSelected(event: any) {
    let allImages: Array<string> = [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/gif',
      'image/tiff',
      'image/bpg',
    ];
    this.imageValidation = '';
    this.selectedFile = event.target.files[0] as File;
    if (allImages.indexOf(this.selectedFile.type) === -1) {
      this.imageValidation = 'Image Type is not permitted';
    }
    /* checking size here - 1MB */
    if (this.selectedFile.size >= 1000000) {
      this.imageValidation = 'Image Size is not permitted';
    } else {
      this.imageValidation = '';
      this.formGroup.patchValue({
        image: this.selectedFile,
      });
    }
  }

  onSubmit(): void {
    if (!this.formGroup.invalid) {
      const formData = new FormData();
      formData.append('image', this.formGroup.get('image')!.value);
      formData.append('title', this.formGroup.get('title')!.value);
      formData.append('text', this.formGroup.get('text')!.value);
      formData.append('articleLink', this.formGroup.get('articleLink')!.value);
      this.saving = true;
      this.createSubscription = this.articleService.create(formData).subscribe({
        next: () => {
          this.saving = false;
          this.formGroup.reset();
          this._notificationService.successTopRight("create","New Item Created");
          this.router.navigate(['../blog']);
        },
        error: (errorMessage) => alert(errorMessage),
      });
    } else {
      if (
        this.formGroup.value.image == null ||
        this.formGroup.value.image == ''
      ) {
        this.imageValidation = 'Image is required';
      }
      this.formGroup.markAllAsTouched();
    }
  }

  get getTitle() {
    return this.formGroup.get('title');
  }
  get getText() {
    return this.formGroup.get('text');
  }
  get getArticleLink() {
    return this.formGroup.get('articleLink');
  }
}
