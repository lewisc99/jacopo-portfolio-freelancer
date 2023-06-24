export class ArticleDTO {
    
}

export class ArticlesDTO {
    
}

export class ArticleRequest 
{
   private title:string;
   private text:string;
   private articleLink: string;
   private image: any;

   constructor(formGroup:any)
   {
        this.title = formGroup.title;
        this.text = formGroup.text;
        this.articleLink = formGroup.articleLink;
        this.image = formGroup.image;
   }
}
