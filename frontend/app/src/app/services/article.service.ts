import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { ArticleDTO, ArticlesDTO, PageModel } from '../domain/entities/article';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private fullURL = environment.article_URL + 'article';

  constructor(private httpClient: HttpClient, private router: Router) {}

  create(articleRequest: any): Observable<any> {
    return this.httpClient
      .post(this.fullURL + '/save-image', articleRequest)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => this.handleErrorException(error));
        })
      );
  }

  public getById(id: string): Observable<ArticleDTO> {
    var getByIdUrl = this.fullURL + '/' + id;
    return this.httpClient.get<ArticleDTO>(getByIdUrl).pipe(
      map((response: ArticleDTO) => response),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleErrorException(error));
      })
    );
  }

  getAll(pageRequest?: PageModel): Observable<ArticlesDTO> {
    let getAllUrl =
      this.fullURL + `?size=${pageRequest?.size}&page=${pageRequest?.page}`;

    return this.httpClient.get<ArticlesDTO>(getAllUrl).pipe(
      map((response: ArticlesDTO) => response),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleErrorException(error));
      })
    );
  }

  update(articleRequest: any): Observable<any> {
    return this.httpClient.put(this.fullURL, articleRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleErrorException(error));
      })
    );
  }

  delete(id: string): Observable<any> {
    let getByIdURL = this.fullURL + '/' + id;
    return this.httpClient
      .delete(getByIdURL)
      .pipe(
        catchError((error) =>
          throwError(() => this.handleErrorException(error))
        )
      );
  }

  private handleErrorException(error: HttpErrorResponse): string {
    var errorMessage = '';
    switch (error.status) {
      case 401:
        errorMessage = 'Token Expired, Please LogIn Again';
        break;
      case 404:
        errorMessage = 'Article Not found';
        break;
      case 500:
        errorMessage = 'Unknown error was thrown';
        break;
    }
    return errorMessage;
  }
}
