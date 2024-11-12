import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CardGetStockComponent } from './card-get-stock.component';
import { ApiFactoryService } from 'src/app/shared/services/factory-api/api-factory.service';

describe('CardGetStockComponent', () => {
  let component: CardGetStockComponent<any>;
  let fixture: ComponentFixture<CardGetStockComponent<any>>;
  let apiFactoryService: ApiFactoryService;

  const mockApiFactoryService = {
    createGet: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardGetStockComponent],
      providers: [
        { provide: ApiFactoryService, useValue: mockApiFactoryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardGetStockComponent);
    component = fixture.componentInstance;
    apiFactoryService = TestBed.inject(ApiFactoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadData', () => {
    it('should load data successfully', () => {
      const mockData = [{ id: 1, name: 'Item 1' }];
      mockApiFactoryService.createGet.mockReturnValue(of(mockData));

      component.loadData();

      expect(apiFactoryService.createGet).toHaveBeenCalledWith(component.apiUrl, {
        ...component.params,
        page: component.page,
        ascending: component.ascending,
      });
      expect(component.data).toEqual(mockData);
    });

    it('should handle error when loading data fails', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const errorResponse = { message: 'Error loading data' };
      mockApiFactoryService.createGet.mockReturnValue(throwError(errorResponse));

      component.loadData();

      expect(consoleSpy).toHaveBeenCalledWith('Error al obtener los datos de stock:', errorResponse);
      consoleSpy.mockRestore();
    });
  });

  describe('pagination and ordering', () => {
    beforeEach(() => {
      component.data = [];
      component.page = 1;
    });

    it('should go to the previous page when prevPage is called', () => {
      component.prevPage();
      expect(component.page).toBe(0);
      expect(mockApiFactoryService.createGet).toHaveBeenCalled();
    });

    it('should not go to a negative page when prevPage is called on the first page', () => {
      component.page = 0;
      component.prevPage();
      expect(component.page).toBe(0);
    });

    it('should go to the next page when nextPage is called', () => {
      component.nextPage();
      expect(component.page).toBe(2); // As page was initialized to 1 in `beforeEach`
      expect(mockApiFactoryService.createGet).toHaveBeenCalled();
    });

    it('should toggle ordering when toggleOrder is called', () => {
      component.ascending = false;
      component.toggleOrder();
      expect(component.ascending).toBe(true);
      expect(mockApiFactoryService.createGet).toHaveBeenCalled();
    });
  });

  describe('getPropertyValue', () => {
    it('should return nested property value if exists', () => {
      const obj = { nested: { key: 'value' } };
      const result = component.getPropertyValue(obj, 'nested.key');
      expect(result).toBe('value');
    });

    it('should return undefined if property does not exist', () => {
      const obj = { nested: { key: 'value' } };
      const result = component.getPropertyValue(obj, 'nested.nonExistentKey');
      expect(result).toBeUndefined();
    });
  });

  describe('refresh', () => {
    it('should reload data when refresh is called', () => {
      const loadDataSpy = jest.spyOn(component, 'loadData');
      component.refresh();
      expect(loadDataSpy).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('should call loadData on initialization', () => {
      const loadDataSpy = jest.spyOn(component, 'loadData');
      component.ngOnInit();
      expect(loadDataSpy).toHaveBeenCalled();
    });
  });
});
