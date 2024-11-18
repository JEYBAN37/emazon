import { TestBed } from '@angular/core/testing';

import { ApiFactoryService } from 'src/app/shared/services/factory-api/api-factory.service';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { ArticleJson } from 'src/app/shared/models/article-json';
import { of, throwError } from 'rxjs';
import { CartService } from './car.service';

describe('CartService', () => {
  let service: CartService;
  let apiFactoryMock: jest.Mocked<ApiFactoryService>;
  let alertServiceMock: jest.Mocked<AlertMessageService>;

  beforeEach(() => {
    const apiMock = {
      createPut: jest.fn(),
      delete: jest.fn(),
    };
    const alertMock = {
      showError: jest.fn(),
      showSuccess: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: ApiFactoryService, useValue: apiMock },
        { provide: AlertMessageService, useValue: alertMock },
      ],
    });

    service = TestBed.inject(CartService);
    apiFactoryMock = TestBed.inject(ApiFactoryService) as jest.Mocked<ApiFactoryService>;
    alertServiceMock = TestBed.inject(AlertMessageService) as jest.Mocked<AlertMessageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCartCount', () => {
    it('should return 0 when cart is empty', () => {
      expect(service.getCartCount()).toBe(0);
    });
  });

  describe('toggleCart', () => {
   
    it('should show error if quantity is 0', () => {
      const product: ArticleJson = { id: 1, name: 'Test Product' } as any;

      service.toggleCart(product, 0);

      expect(alertServiceMock.showError).toHaveBeenCalledWith('La cantidad debe ser mayor que 0');
    });

    it('should add product if it is not in the cart', () => {
      const product: ArticleJson = { id: 1, name: 'Test Product' } as any;
      const quantity = 2;

      apiFactoryMock.createPut.mockReturnValue(of({ success: true }));

      service.toggleCart(product, quantity);

      expect(apiFactoryMock.createPut).toHaveBeenCalledWith(service['apiUrlCarAdd'], { idArticles: { 1: 2 } });
      expect(alertServiceMock.showSuccess).toHaveBeenCalledWith('Producto agregado correctamente');
      expect(service.isInCart(product)).toBe(true);
    });

    it('should remove product if it is already in the cart', () => {
      const product: ArticleJson = { id: 1, name: 'Test Product' } as any;
      apiFactoryMock.delete.mockReturnValue(of());
      const quantity = 2;

      service['cart'].set(product.id, { product, quantity }); // Add product to cart
    

      service.toggleCart(product, quantity);

      expect(apiFactoryMock.delete).toHaveBeenCalledWith(service['apiUrlCarDelete'], { idArticle: product.id });
      expect(service.isInCart(product)).toBe(false);
    });
  });

  describe('updateCart', () => {
    it('should update the cart and show success message', () => {
      const product: ArticleJson = { id: 1, name: 'Test Product' } as any;
      const quantity = 3;

      apiFactoryMock.createPut.mockReturnValue(of({ success: true }));

      service['updateCart'](product, quantity);

      expect(apiFactoryMock.createPut).toHaveBeenCalledWith(service['apiUrlCarAdd'], { idArticles: { 1: 3 } });
      expect(alertServiceMock.showSuccess).toHaveBeenCalledWith('Producto agregado correctamente');
      expect(service.getCartCount()).toBe(3);
    });

    it('should show error message if API fails', () => {
      const product: ArticleJson = { id: 1, name: 'Test Product' } as any;
      const quantity = 3;

      apiFactoryMock.createPut.mockReturnValue(throwError({ error: { message: 'Error al agregar' } }));

      service['updateCart'](product, quantity);

      expect(alertServiceMock.showError).toHaveBeenCalledWith('Error al agregar');
    });
  });

  describe('deleteProductFromCart', () => {
   

    it('should show error message if API fails', () => {
      const product: ArticleJson = { id: 1, name: 'Test Product' } as any;

      apiFactoryMock.delete.mockReturnValue(throwError({ error: { message: 'Error al eliminar' } }));

      service['deleteProductFromCart'](product);

      expect(alertServiceMock.showError).toHaveBeenCalledWith('Error al eliminar');
    });
  });

  describe('isInCart', () => {
    it('should return true if product is in the cart', () => {
      const product: ArticleJson = { id: 1, name: 'Test Product' } as any;

      service['cart'].set(product.id, { product, quantity: 1 });

      expect(service.isInCart(product)).toBe(true);
    });

    it('should return false if product is not in the cart', () => {
      const product: ArticleJson = { id: 1, name: 'Test Product' } as any;

      expect(service.isInCart(product)).toBe(false);
    });
  });
});
