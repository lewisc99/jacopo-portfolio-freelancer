import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleDTO } from 'src/app/domain/entities/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrls: ['./blog-update.component.scss'],
})
export class BlogUpdateComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public saving: boolean;
  public selectedFile: File;
  public imageValidation: string = '';
  private getIdSubscription: Subscription = new Subscription();
  private getIdUpdateSubscription: Subscription = new Subscription();
  private articleDTO: ArticleDTO = new ArticleDTO();

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getIdSubscription = this.activatedRoute.paramMap.subscribe(
      (params: any) => {
        var id = params.get('id');
        this.getArticleById(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.getIdSubscription.unsubscribe();
    this.getIdUpdateSubscription.unsubscribe();
  }

  getArticleById(id: string): void {
    this.getIdSubscription = this.articleService.getById(id).subscribe({
      next: (result: ArticleDTO) => {
        this.articleDTO = result;
        this.initiateFormGroup();
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  initiateFormGroup(): void {
    this.formGroup = this.fb.group({
      id: [this.articleDTO.id],
      title: [
        this.articleDTO.title,
        [Validators.required, Validators.maxLength(100)],
      ],
      text: [
        this.articleDTO.text,
        [Validators.required, Validators.maxLength(300)],
      ],
      articleLink: [
        this.articleDTO.articleLink,
        [Validators.required, Validators.maxLength(200)],
      ],
      image: [, [Validators.required]],
    });
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
      formData.append('id', this.formGroup.get('id')!.value);
      formData.append('image', this.formGroup.get('image')!.value);
      formData.append('title', this.formGroup.get('title')!.value);
      formData.append('text', this.formGroup.get('text')!.value);
      formData.append('articleLink', this.formGroup.get('articleLink')!.value);
      this.saving = true;
      this.getIdUpdateSubscription = this.articleService
        .update(formData)
        .subscribe({
          next: () => {
            this.saving = false;
            this.formGroup.reset();
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
