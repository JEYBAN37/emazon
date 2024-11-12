import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelAdminComponent } from './panel-admin.component';
import { By } from '@angular/platform-browser';
import { CardGetStockComponent } from '../../molecules/card-get-stock/card-get-stock.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiFactoryService } from 'src/app/shared/services/factory-api/api-factory.service';

describe('PanelAdminComponent', () => {
  let component: PanelAdminComponent;
  let fixture: ComponentFixture<PanelAdminComponent>;
  let mockGetArticle: CardGetStockComponent<any>;
  let mockGetBrand: CardGetStockComponent<any>;
  let mockGetCategory: CardGetStockComponent<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelAdminComponent, CardGetStockComponent],
      imports: [HttpClientModule], // Import HttpClientModule here
    }).compileComponents();

    fixture = TestBed.createComponent(PanelAdminComponent);
    component = fixture.componentInstance;

    // Mock the ViewChild components
    const apiFactoryService = TestBed.inject(ApiFactoryService);
    mockGetArticle = new CardGetStockComponent<any>(apiFactoryService);
    mockGetBrand = new CardGetStockComponent<any>(apiFactoryService);
    mockGetCategory = new CardGetStockComponent<any>(apiFactoryService);

    component.getArticle = mockGetArticle;
    component.getBrand = mockGetBrand;
    component.getCategory = mockGetCategory;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize articlesClass, categoryClass, and brandClass', () => {
    expect(component.articlesClass).toBeDefined();
    expect(component.categoryClass).toBeDefined();
    expect(component.brandClass).toBeDefined();
  });

  it('should have the correct initial values for fields and columns', () => {
    expect(component.articleFields).toEqual([
      { key: 'name', label: 'Nombre' },
      { key: 'quantity', label: 'Cantidad' },
      { key: 'price', label: 'Precio' },
      { key: 'brand.name', label: 'Marca' },
    ]);
    expect(component.stockFields).toEqual([
      { key: 'name', label: 'Nombre' },
      { key: 'description', label: 'Descripcion' },
    ]);
    expect(component.articlesColumns).toEqual(['Nombre', 'Cantidad', 'Precio', 'Marca']);
    expect(component.stockColumns).toEqual(['Nombre', 'Descripcion']);
  });

  it('should select the correct tab index when selectTab is called', () => {
    component.selectTab(2);
    expect(component.selectedTab).toBe(2);
  });


  it('should initialize articlesClass, categoryClass, and brandClass', () => {
    expect(component.articlesClass).toBeDefined();
    expect(component.categoryClass).toBeDefined();
    expect(component.brandClass).toBeDefined();
  });

  it('should set the apiUrl values correctly', () => {
    expect(component.apiUrlArticles).toBe('http://localhost:8086/secure/articles/');
    expect(component.apiUrlCategory).toBe('http://localhost:8086/secure/category/');
    expect(component.apiUrlBrand).toBe('http://localhost:8086/secure/brands/');
  });

  it('should render the correct number of tabs', () => {
    const tabs = fixture.debugElement.queryAll(By.css('.tab'));
    expect(tabs.length).toBe(0);
  });
});
