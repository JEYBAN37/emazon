import { Component, Input, OnInit } from '@angular/core';
import { ArticleJson } from 'src/app/shared/models/article-json';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { ApiFactoryService } from 'src/app/shared/services/factory-api/api-factory.service';

@Component({
  selector: 'app-marketplace-component',
  templateUrl: './marketplace-component.component.html',
  styleUrls: ['./marketplace-component.component.scss'],
  providers: [AlertMessageService]
})
export class MarketplaceComponent implements OnInit {

   // Existing properties...
  selectedProduct: ArticleJson | null = null;  // To hold the selected product
  apiUrl: string = 'http://localhost:8086/secure/articles/';
  apiUrlCarAdd: string = 'http://localhost:8081/secure/update/';
  apiUrlCarDelete: string = 'http://localhost:8081/secure/delete/';

  page: number = 0;
  sizeData: number = 10;
  ascending: boolean = false;
  searchTerm: string = '';
  data: ArticleJson[] = [];
  cart: Map<number, { product: ArticleJson, quantity: number }> = new Map();  // Mapa para productos y cantidades
  cartCount: number = 0;

  // Parámetros para filtrar los artículos
  articleCustomParams: { 
    size: number; 
    byName: string | null;
    byBrand: string | null;
    byCategory: string | null 
  } = { size: 10, byName: null, byBrand: null, byCategory: null };

  constructor(private apiFactory: ApiFactoryService,
              public alertService: AlertMessageService) {}

  ngOnInit(): void {
    this.loadData();
  }


    // Open modal with product details
    openProductDetails(product: ArticleJson): void {
      this.selectedProduct = product;
    }
  
    // Close the modal
    closeModal(): void {
      this.selectedProduct = null;
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

  toggleCart(product: ArticleJson, quantity: number): void {
    if (quantity <= 0) {
      this.alertService.showError('La cantidad debe ser mayor que 0');
      return;
    }
  
    const existingProduct = this.cart.get(product.id);
  
    if (existingProduct) {
      // Si el producto ya está en el carrito, eliminamos el producto
      this.cart.delete(product.id);
      this.cartCount = Array.from(this.cart.values()).reduce((total, item) => total + item.quantity, 0);
      this.deleteProductFromCart(product);
    } else {
      // Si el producto no está en el carrito, lo agregamos con la cantidad
      this.updateCart(product, quantity);
    }
  }
  
  updateCart(product: ArticleJson, quantity: number): void {
    // Wrap requestMap inside idArticles
    const requestPayload: any = {
      idArticles: {}
    };
  
    // Add the product to the request payload
    requestPayload.idArticles[product.id] = quantity;
  
    this.apiFactory.createPut<any>(this.apiUrlCarAdd, requestPayload).subscribe(
      (response) => {
        this.cart.set(product.id, { product, quantity }); // Add the product to the cart
        this.cartCount = Array.from(this.cart.values()).reduce((total, item) => total + item.quantity, 0);
        this.alertService.showSuccess('Producto agregado correctamente');
      },
      (error) => {
        this.alertService.showError(error.error?.message || 'Hubo un error al agregar el producto');
        // Optionally, you could rollback changes if necessary, or keep the cart as is.
      }
    );
  }
  

  removeFromCart(product: ArticleJson): void {
    this.cart.delete(product.id);
    this.cartCount = Array.from(this.cart.values()).reduce((total, item) => total + item.quantity, 0);
    this.deleteProductFromCart(product);
  }

  deleteProductFromCart(product: ArticleJson): void {


    this.apiFactory.delete<any>(this.apiUrlCarDelete, { idArticle: product.id }).subscribe(
      (response) => {
        this.alertService.showSuccess('Producto eliminado del carrito');
      },
      (error) => {
        this.alertService.showError(error.error?.message || 'Hubo un error al eliminar');
      }
    );
  }

  isInCart(product: ArticleJson): boolean {
    return this.cart.has(product.id);
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
