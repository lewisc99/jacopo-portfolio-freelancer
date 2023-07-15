import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogCreateComponent } from './components/blog-create/blog-create.component';
import { BlogUpdateComponent } from './components/blog-update/blog-update.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"blog", component:BlogComponent },
  {path:"blog/create", component:BlogCreateComponent },
  {path:"blog/:id/update", component:BlogUpdateComponent},
  {path:"",component:HomeComponent},
  {path:"**", redirectTo:"",pathMatch:"full"}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
