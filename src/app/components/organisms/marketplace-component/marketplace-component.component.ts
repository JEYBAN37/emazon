import { Component, OnInit } from '@angular/core';
import { ArticleJson } from 'src/app/shared/models/article-json';
import { CartService } from 'src/app/shared/services/car/car.service';
import { ApiFactoryService } from 'src/app/shared/services/factory-api/api-factory.service';

@Component({
  selector: 'app-marketplace-component',
  templateUrl: './marketplace-component.component.html',
  styleUrls: ['./marketplace-component.component.scss']
})
export class MarketplaceComponent implements OnInit {
  
  selectedProduct: ArticleJson | null = null;
  apiUrl: string = 'http://localhost:8086/secure/articles/';
  
  page: number = 0;
  sizeData: number = 10;
  ascending: boolean = false;
  searchTerm: string = '';
  data: ArticleJson[] = [];

  articleCustomParams: { 
    size: number; 
    byName: string | null;
    byBrand: string | null;
    byCategory: string | null 
  } = { size: 10, byName: null, byBrand: null, byCategory: null };

  constructor(
    private apiFactory: ApiFactoryService,
    public cartService: CartService  // Inyectar el CartService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const combinedParams = {
      page: this.page,
      ascending: this.ascending,
      size: this.articleCustomParams.size,
      byName: this.articleCustomParams.byName,
      byBrand: this.articleCustomParams.byBrand,
      byCategory: this.articleCustomParams.byCategory
    };

    this.apiFactory.createGet<ArticleJson[]>(this.apiUrl, combinedParams).subscribe(
      (objects: ArticleJson[]) => {
        this.data = objects;
        this.sizeData = objects.length;
      },
      (error) => {
        console.error('Error al obtener los datos de stock:', error);
      }
    );
  }

  openProductDetails(product: ArticleJson): void {
    this.selectedProduct = product;
  }

  closeModal(): void {
    this.selectedProduct = null;
  }

  toggleCart(product: ArticleJson, quantity: number): void {
    this.cartService.toggleCart(product, quantity);
  }

  isInCart(product: ArticleJson): boolean {
    return this.cartService.isInCart(product);
  }

  handleFilterChange(selectedFilter: { name: string, brand: string, article: string }): void {
    this.articleCustomParams.byName = selectedFilter.name || null;
    this.articleCustomParams.byBrand = selectedFilter.brand || null;
    this.articleCustomParams.byCategory = selectedFilter.article || null;

    this.page = 0;
    this.loadData();
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadData();
    }
  }

  nextPage(): void {
    if (this.data.length === this.sizeData) {
      this.page++;
      this.loadData();
    }
  }

  toggleOrder(): void {
    this.ascending = !this.ascending;
    this.loadData();
  }
}
