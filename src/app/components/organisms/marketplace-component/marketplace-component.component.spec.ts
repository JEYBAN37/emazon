import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketplaceComponent } from './marketplace-component.component';
import { CartService } from 'src/app/shared/services/car/car.service';
import { ApiFactoryService } from 'src/app/shared/services/factory-api/api-factory.service';
import { of, throwError } from 'rxjs';
import { ArticleJson } from 'src/app/shared/models/article-json';

describe('MarketplaceComponent', () => {
  let component: MarketplaceComponent;
  let fixture: ComponentFixture<MarketplaceComponent>;
  let apiFactoryServiceSpy: jest.Mocked<ApiFactoryService>;
  let cartServiceSpy: jest.Mocked<CartService>;

  beforeEach(async () => {
    const apiFactoryServiceMock = {
      createGet: jest.fn()
    };

    const cartServiceMock = {
      toggleCart: jest.fn(),
      isInCart: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [MarketplaceComponent],
      providers: [
        { provide: ApiFactoryService, useValue: apiFactoryServiceMock },
        { provide: CartService, useValue: cartServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MarketplaceComponent);
    component = fixture.componentInstance;
    apiFactoryServiceSpy = TestBed.inject(ApiFactoryService) as jest.Mocked<ApiFactoryService>;
    cartServiceSpy = TestBed.inject(CartService) as jest.Mocked<CartService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    const mockProduct: ArticleJson[] = [{ id: 1, name: 'Test Article',description:'d', quantity: 10, price: 100, brand: { id:1, name: 'Test Brand' }, articleCategories: [{ id: 1, name: 'Test Category' }] }];
    apiFactoryServiceSpy.createGet.mockReturnValue(of(mockProduct));

    component.ngOnInit();

    expect(apiFactoryServiceSpy.createGet).toHaveBeenCalledWith(component.apiUrl, expect.any(Object));
    expect(component.data).toEqual(mockProduct);
    expect(component.sizeData).toBe(mockProduct.length);
  });

  it('should handle error when loading data', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    apiFactoryServiceSpy.createGet.mockReturnValue(throwError('Error'));

    component.loadData();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al obtener los datos de stock:', 'Error');
  });

  it('should open and close product details', () => {
    const mockProduct: ArticleJson = { id: 1, name: 'Test Article',description:'d', quantity: 10, price: 100, brand: { id:1, name: 'Test Brand' }, articleCategories: [{ id: 1, name: 'Test Category' }] };

    component.openProductDetails(mockProduct);
    expect(component.selectedProduct).toBe(mockProduct);

    component.closeModal();
    expect(component.selectedProduct).toBeNull();
  });

  it('should toggle cart', () => {
    const mockProduct: ArticleJson = { id: 1, name: 'Test Article',description:'d', quantity: 10, price: 100, brand: { id:1, name: 'Test Brand' }, articleCategories: [{ id: 1, name: 'Test Category' }] };
    const quantity = 1;

    component.toggleCart(mockProduct, quantity);
    expect(cartServiceSpy.toggleCart).toHaveBeenCalledWith(mockProduct, quantity);
  });

  it('should check if product is in cart', () => {
    const mockProduct: ArticleJson = { id: 1, name: 'Test Article',description:'d', quantity: 10, price: 100, brand: { id:1, name: 'Test Brand' }, articleCategories: [{ id: 1, name: 'Test Category' }] };
    cartServiceSpy.isInCart.mockReturnValue(true);

    const result = component.isInCart(mockProduct);
    expect(result).toBe(true);
    expect(cartServiceSpy.isInCart).toHaveBeenCalledWith(mockProduct);
  });




  it('should not go to previous page if already on first page', () => {
    const loadDataSpy = jest.spyOn(component, 'loadData');
    component.page = 0;

    component.prevPage();

    expect(component.page).toBe(0);
    expect(loadDataSpy).not.toHaveBeenCalled();
  });

  it('should go to previous page and reload data', () => {
    // Mock de datos devueltos por la API
    const mockArticles = [{ id: 1, name: 'Test Article' }];
    apiFactoryServiceSpy.createGet.mockReturnValue(of(mockArticles));

    const loadDataSpy = jest.spyOn(component, 'loadData');
    component.page = 1;

    component.prevPage();

    expect(component.page).toBe(0);
    expect(loadDataSpy).toHaveBeenCalled();
    expect(apiFactoryServiceSpy.createGet).toHaveBeenCalledWith(component.apiUrl, {
      page: 0,
      ascending: false,
      size: 9,
      byName: null,
      byBrand: null,
      byCategory: null
    });
  });
  



  it('should not go to previous page if already on first page', () => {
    const loadDataSpy = jest.spyOn(component, 'loadData');
    component.page = 0;

    component.prevPage();

    expect(component.page).toBe(0);
    expect(loadDataSpy).not.toHaveBeenCalled();
  });

  it('should go to next page and reload data if data length equals sizeData', () => {
    const loadDataSpy = jest.spyOn(component, 'loadData');
    const mockData: ArticleJson[] = new Array(component.sizeData).fill({ id: 1, name: 'Test Article', quantity: 10, price: 100, brand: { name: 'Test Brand' } });
    apiFactoryServiceSpy.createGet.mockReturnValue(of(mockData));

    component.data = mockData;
    component.nextPage();

    expect(component.page).toBe(1);
    expect(loadDataSpy).toHaveBeenCalled();
  });

  it('should not go to next page if data length is less than sizeData', () => {
    const loadDataSpy = jest.spyOn(component, 'loadData');
    const mockData: ArticleJson[] = new Array(component.sizeData - 1).fill({ id: 1, name: 'Test Article', quantity: 10, price: 100, brand: { name: 'Test Brand' } });
    apiFactoryServiceSpy.createGet.mockReturnValue(of(mockData));

    component.data = mockData;
    component.nextPage();

    expect(component.page).toBe(0);
    expect(loadDataSpy).not.toHaveBeenCalled();
  });

  it('should toggle order and reload data', () => {
    const mockArticles = [{ id: 1, name: 'Test Article' }];
    apiFactoryServiceSpy.createGet.mockReturnValue(of(mockArticles));

    const loadDataSpy = jest.spyOn(component, 'loadData');
    component.ascending = false;

    component.toggleOrder();

    expect(component.ascending).toBe(true);
    expect(loadDataSpy).toHaveBeenCalled();
  });

  it('should not go to next page if data length is less than sizeData', () => {
    const loadDataSpy = jest.spyOn(component, 'loadData');
    component.data = new Array(component.sizeData - 1).fill({});

    component.nextPage();

    expect(component.page).toBe(0);
    expect(loadDataSpy).not.toHaveBeenCalled();
  });

  it('should handle filter change with undefined values and reload data', () => {
    const mockFilter = { name: null, brand: null, category: null };
    const mockArticles = [{ id: 1, name: 'Test Article' }];
    apiFactoryServiceSpy.createGet.mockReturnValue(of(mockArticles));

    const loadDataSpy = jest.spyOn(component, 'loadData');

    component.handleFilterChange(mockFilter);

    expect(component.articleCustomParams.byName).toBeNull();
    expect(component.articleCustomParams.byBrand).toBeNull();
    expect(component.articleCustomParams.byCategory).toBeNull();
    expect(component.page).toBe(0);
  
  });

});