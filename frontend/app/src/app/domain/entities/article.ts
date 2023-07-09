export class ArticleDTO {
   public id:string;
   public title:string;
   public text:string;
   public articleLink: string;
   public image: any;
}

export class ArticlesDTO {
   public _embedded:ArticleDTO[] = [];
   public totalPages: number;
   public totalElements: number;
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


export class PageModel {
   public page:number;
   public size:number;
}