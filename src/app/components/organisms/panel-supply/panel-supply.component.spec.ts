import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PanelSupplyComponent } from './panel-supply.component';
import { CardGetStockComponent } from '../../molecules/card-get-stock/card-get-stock.component';
import { Supply, SupplyDetails } from 'src/app/shared/models/supply-interface';

describe('PanelSupplyComponent', () => {
  let component: PanelSupplyComponent;
  let fixture: ComponentFixture<PanelSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSupplyComponent, CardGetStockComponent ],
      imports: [ HttpClientModule ]  // Import HttpClientModule here
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new supply to supplies when addSupply is called', () => {
    const supply : Supply = { idArticle: 1, quantity: 10, state: 'Available' };  // Example supply object
    component.addSupply(supply);
    expect(component.supplies.length).toBe(1);
    expect(component.supplies[0]).toEqual(supply);
  });

  it('should initialize with default values', () => {
    expect(component.responseData).toBeUndefined();
    expect(component.articlesClass).toBeDefined();
    expect(component.supplies).toEqual([]);
    expect(component.articleCustomParams).toEqual({ size: 5, byName: null, brand: null, article: null });
    expect(component.selectedTab).toBe(0);
    expect(component.apiUrlArticles).toBe('http://localhost:8086/secure/articles/');
  });

  it('should update responseData when onSuppliesUpdated is called', () => {
    const mockResponse: SupplyDetails[] = [
      { id: 1, quantity: 100, state: 'Available', date: '2024-01-01' },
    ];
    component.onSuppliesUpdated(mockResponse);
    expect(component.responseData).toEqual(mockResponse);
  });

  it('should update selectedTab when selectTab is called', () => {
    component.selectTab(1);
    expect(component.selectedTab).toBe(1);
  });


  it('should set articleCustomParams and call makeSearchRequest and refresh when handleSearchParams is called', () => {
    const searchParams = { name: 'TestName', brand: 'TestBrand', article: 'TestArticle' };
    const makeSearchRequestSpy = jest.spyOn(component, 'makeSearchRequest');
    const refreshSpy = jest.spyOn(component.getArticle, 'refresh');

    component.handleSearchParams(searchParams);

    expect(component.articleCustomParams.byName).toBe('TestName');
    expect(component.articleCustomParams.brand).toBe('TestBrand');
    expect(component.articleCustomParams.article).toBe('TestArticle');
    expect(refreshSpy).toHaveBeenCalled();
    expect(component.getArticle.refresh).toHaveBeenCalled();
  });

  it('should add a new supply to supplies when addSupply is called', () => {
    const newSupply: Supply = {  quantity: 50, state: 'New', idArticle: 4 };
    component.addSupply(newSupply);
    expect(component.supplies).toContain(newSupply);
  });


  it('should log search parameters in makeSearchRequest', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.articleCustomParams = { size: 10, byName: 'Test', brand: 'BrandTest', article: 'ArticleTest' };

    component.makeSearchRequest();

    expect(consoleSpy).toHaveBeenCalledWith('Haciendo búsqueda con los siguientes parámetros:', {
      size: 10,
      byName: 'Test',
      brand: 'BrandTest',
      article: 'ArticleTest',
    });

  });
  // Other tests for PanelSupplyComponent can go here
});
