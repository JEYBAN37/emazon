import { Injectable } from '@angular/core';
import { ApiFactoryService } from 'src/app/shared/services/factory-api/api-factory.service';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { ArticleJson } from 'src/app/shared/models/article-json';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Map<number, { product: ArticleJson, quantity: number }> = new Map();  // Mapa para productos y cantidades
  private cartCount: number = 0;
  private apiUrlCarAdd: string = 'http://localhost:8081/secure/update/';
  private apiUrlCarDelete: string = 'http://localhost:8081/secure/delete/';

  constructor(
    private apiFactory: ApiFactoryService,
    private alertService: AlertMessageService
  ) { }

  // Obtener el conteo de productos en el carrito
  getCartCount(): number {
    return this.cartCount;
  }

  // Agregar o eliminar productos del carrito
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


  

  // Actualizar el carrito con un nuevo producto
  private updateCart(product: ArticleJson, quantity: number): void {
    const requestPayload: any = {
      idArticles: {}
    };

    // Agregar el producto al payload de la solicitud
    requestPayload.idArticles[product.id] = quantity;

    this.apiFactory.createPut<any>(this.apiUrlCarAdd, requestPayload).subscribe(
      (response) => {
        this.cart.set(product.id, { product, quantity }); // Agregar el producto al carrito
        this.cartCount = Array.from(this.cart.values()).reduce((total, item) => total + item.quantity, 0);
        this.alertService.showSuccess('Producto agregado correctamente');
      },
      (error) => {
        this.alertService.showError(error.error?.message || 'Hubo un error al agregar el producto');
      }
    );
  }

  // Eliminar producto del carrito
  private deleteProductFromCart(product: ArticleJson): void {
    this.apiFactory.delete<any>(this.apiUrlCarDelete, { idArticle: product.id }).subscribe(
      (response) => {
        this.alertService.showSuccess('Producto eliminado del carrito');
      },
      (error) => {
        this.alertService.showError(error.error?.message || 'Hubo un error al eliminar');
      }
    );
  }

  // Verificar si un producto está en el carrito
  isInCart(product: ArticleJson): boolean {
    return this.cart.has(product.id);
  }
}

