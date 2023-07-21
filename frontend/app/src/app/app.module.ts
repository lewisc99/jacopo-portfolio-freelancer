import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogCreateComponent } from './components/blog-create/blog-create.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogUpdateComponent } from './components/blog-update/blog-update.component';
import { AuthGuard } from './shared/auth-guards/auth.guard';
import { TokenInterceptor } from './shared/interceptor/token-interceptor.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    BlogComponent,
    BlogCreateComponent,
    BlogUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true}, AuthGuard, TranslateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpTranslateLoader(http: HttpClient)
{
     return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
