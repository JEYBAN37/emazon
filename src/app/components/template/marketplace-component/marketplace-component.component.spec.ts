import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketplaceComponent } from './marketplace-component.component';
import { ArticleMarket, ArticleMarketService } from 'src/app/shared/services/article-market-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';



describe('MarketplaceComponentComponent', () => {
  let component: MarketplaceComponent;
  let fixture: ComponentFixture<MarketplaceComponent>;
  let articleMarketService: ArticleMarketService;

  const mockArticles: ArticleMarket[] = [
    { name: 'Product 1', description: 'Description 1', quantity: 10, price: 100, brand: { id: 1, name: 'Brand 1' }, articleCategories: [{ id: 1, name: 'Category 1' }] },
    { name: 'Product 2', description: 'Description 2', quantity: 5, price: 200, brand: { id: 2, name: 'Brand 2' }, articleCategories: [{ id: 2, name: 'Category 2' }] }
  ];
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketplaceComponent],
      imports: [HttpClientTestingModule],
      providers: [ArticleMarketService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceComponent);
    component = fixture.componentInstance;
    articleMarketService = TestBed.inject(ArticleMarketService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load all products on initialization', () => {
    const getSpy = jest.spyOn(articleMarketService, 'get').mockReturnValue(of(mockArticles));

    component.ngOnInit();
    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalledWith(0, 10, true, null);
    expect(component.products).toEqual(mockArticles);
  });

  it('should call loadAllProducts and fetch articles', () => {
    const getSpy = jest.spyOn(articleMarketService, 'get').mockReturnValue(of(mockArticles));

    component.loadAllProducts();

    expect(getSpy).toHaveBeenCalledWith(0, 10, true, null);
    expect(component.products).toEqual(mockArticles);
  });

  it('should handle search and update products list', () => {
    const searchTerm = 'Sample Search';
    component.searchTerm = searchTerm;

    const getSpy = jest.spyOn(articleMarketService, 'get').mockReturnValue(of(mockArticles));

    component.handleSearch(new Event('submit'));

    expect(getSpy).toHaveBeenCalledWith(0, 10, true, searchTerm);
    expect(component.products).toEqual(mockArticles);
  });

  it('should log error on fetch failure in loadAllProducts', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    jest.spyOn(articleMarketService, 'get').mockReturnValue(throwError(() => new Error('API Error')));

    component.loadAllProducts();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching articles:', new Error('API Error'));
  });

  it('should log error on fetch failure in handleSearch', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    component.searchTerm = 'Test Search';

    jest.spyOn(articleMarketService, 'get').mockReturnValue(throwError(() => new Error('API Error')));

    component.handleSearch(new Event('submit'));

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching articles:', new Error('API Error'));
  });
});
