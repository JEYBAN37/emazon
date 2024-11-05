import { Component, OnInit } from '@angular/core';
import { ArticleMarket, ArticleMarketService } from 'src/app/shared/services/article-market-service';

@Component({
  selector: 'app-marketplace-component',
  templateUrl: './marketplace-component.component.html',
  styleUrls: ['./marketplace-component.component.scss']
})
export class MarketplaceComponent implements OnInit {
  searchTerm: string = '';
  products: ArticleMarket[] = [];

  constructor(private articleMarketService: ArticleMarketService) {}

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts() {
    const page = 0;
    const size = 10;
    const ascending = true;
    const filterByName = null;

    this.articleMarketService.get(page, size, ascending, filterByName).subscribe({
      next: (articles) => {
        this.products = articles;
        console.log(this.products);
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
      }
    });
  }

  handleSearch(event: Event) {
    event.preventDefault();
    const page = 0;
    const size = 10;
    const ascending = true;
    const filterByName = this.searchTerm || null;

    this.articleMarketService.get(page, size, ascending, filterByName).subscribe({
      next: (articles) => {
        this.products = articles;
        console.log(this.products);
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
      }
    });
  }
}
