import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  public portfolios:Portfolio[] = [
    {
        "id":"portfolio-1",
        "title":"Gym Project",
        "subtitle":"Freelance Gym Dashboard",
        "src":"../assets/images/portfolio/gym.svg",
        "href":"gym-dashboard",
        "show":true
    },
    {
        "id":"portfolio-2",
        "title":"Commerce Project",
        "subtitle":"Commerce Project",
        "src":"../assets/images/portfolio/ecommerce.svg",
        "href":"ecommerce-project",
        "show":false
    },
    {
        "id":"portfolio-3",
        "title":"Chat App",
        "subtitle":"Real Time Message App",
        "src":"../assets/images/portfolio/chat.svg",
        "href":"chat-app",
        "show":false
    },
    {
        "id":"portfolio-4",
        "title":"Candidate Dashboard",
        "subtitle":"CRUD app to interview test",
        "src":"../assets/images/portfolio/candidate.svg",
        "href":"candidate-dashboard",
        "show":false
    },
    {
        "id":"portfolio-5",
        "title":"Person Microservice API",
        "subtitle":"API using RabbitMQ and Mongo",
        "src":"../assets/images/portfolio/person.svg",
        "href":"person-microservice",
        "show":false
    },
    {
        "id":"portfolio-6",
        "title":"Curriculum Dashboard",
        "subtitle":"ASPNET MVC Curriculum app",
        "src":"../assets/images/portfolio/curriculum.svg",
        "href":"curriculum-dashboard",
        "show":false
    },
    {
        "id":"portfolio-7",
        "title":"Landing Page Laundry Website",
        "subtitle":"Freelance Laundry Machine",
        "src":"../assets/images/portfolio/lavamaq.svg",
        "href":"laundry-landing-page",
        "show":false
    },
    {
        "id":"portfolio-8",
        "title":"Microservice Discount API",
        "subtitle":"Project to Bidea Factory Company",
        "src":"../assets/images/portfolio/discount.svg",
        "href":"discount-api-microservice",
        "show":false
    }
];
  
  slidePortfolio(direction:string)
  {
     let currentPortfolio = this.portfolios.filter(portfolio => portfolio.show);
     let IndexCurrentPortfolio = this.portfolios.findIndex(portfolioIndex => portfolioIndex.id == currentPortfolio[0].id);
     let firstPortfolioIndex = 0;
     this.portfolios[IndexCurrentPortfolio].show = false;


     if (direction == "right")
     {
      if (IndexCurrentPortfolio == this.portfolios.length -1) {
        this.portfolios[0].show = true;
        return;
      }
       this.portfolios[IndexCurrentPortfolio + 1].show = true;
       return;
     }

      if (IndexCurrentPortfolio == firstPortfolioIndex) 
      {
        this.portfolios[this.portfolios.length - 1].show = true;
        return;
      }
      this.portfolios[IndexCurrentPortfolio - 1].show = true;
  }
  
  dotSelectedPortfolio(portfolioId:string)
  {
    let currentPortfolio = this.portfolios.filter(portfolio => portfolio.show);
    let IndexCurrentPortfolio = this.portfolios.findIndex(portfolioIndex => portfolioIndex.id == currentPortfolio[0].id);
    let IndexSelectedPortfolio = this.portfolios.findIndex(portfolioIndex => portfolioIndex.id == portfolioId);

    this.portfolios[IndexCurrentPortfolio].show = false;
    this.portfolios[IndexSelectedPortfolio].show = true;
  }
}

class Portfolio {
  id!: string;
  title!: string;
  subtitle!: string;
  src!: string;
  href!: string;
  show!: boolean;
}