import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiFactoryService } from 'src/app/shared/services/factory-api/api-factory.service';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { ArticleJson, BrandJson } from 'src/app/shared/models/article-json';
import { of, throwError } from 'rxjs';
import { CartService } from './car.service';

jest.mock('src/app/shared/services/alerts-services/alert-message.service');

describe('CartService', () => {
  let cartService: CartService;
  let apiFactoryMock: jest.Mocked<ApiFactoryService>;
  let alertServiceMock: jest.Mocked<AlertMessageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Import the HttpClientTestingModule
      providers: [
        ApiFactoryService,
        AlertMessageService,
      ],
    });

    // Inject the ApiFactoryService and mock it
    apiFactoryMock = TestBed.inject(ApiFactoryService) as jest.Mocked<ApiFactoryService>;
    alertServiceMock = new AlertMessageService() as jest.Mocked<AlertMessageService>;

    // Instantiate CartService with the mocked dependencies
    cartService = new CartService(apiFactoryMock, alertServiceMock);

    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(cartService).toBeTruthy();
  });

  it('should return the correct cart count', () => {
    expect(cartService.getCartCount()).toBe(0);
  });

  it('should show error if quantity is less than or equal to 0', () => {
    const product: ArticleJson = {
      id: 1, name: 'Test Product', quantity: 10, price: 100, brand: new BrandJson(),
      description: '',
      articleCategories: []
    };
    cartService.toggleCart(product, 0);
    expect(alertServiceMock.showError).toHaveBeenCalledWith('La cantidad debe ser mayor que 0');
  });


  it('should return false if product is not in cart', () => {
    const product: ArticleJson = {
      id: 1, name: 'Test Product', quantity: 10, price: 100, brand: new BrandJson(),
      description: '',
      articleCategories: []
    };

    expect(cartService.isInCart(product)).toBe(false);
  });
  
});
