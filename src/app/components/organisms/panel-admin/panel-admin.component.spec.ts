import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelAdminComponent } from './panel-admin.component';
import { CategoryService } from 'src/app/shared/services/category-service';
import { BrandService } from 'src/app/shared/services/brand-service';
import { ArticleService } from 'src/app/shared/services/article-service';
import { UserAuxService } from 'src/app/shared/services/user-aux-service';

describe('PanelAdminComponent', () => {
  let component: PanelAdminComponent;
  let fixture: ComponentFixture<PanelAdminComponent>;

  // Mocks for the services
  const mockCategoryService = {} as CategoryService;
  const mockBrandService = {} as BrandService;
  const mockArticleService = {} as ArticleService;
  const mockUserAuxService = {} as UserAuxService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelAdminComponent],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: BrandService, useValue: mockBrandService },
        { provide: ArticleService, useValue: mockArticleService },
        { provide: UserAuxService, useValue: mockUserAuxService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAdminComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should assign services correctly in constructor', () => {
    expect(component.stockServiceCategory).toBe(mockCategoryService);
    expect(component.stockServiceBrand).toBe(mockBrandService);
    expect(component.stockServiceArticle).toBe(mockArticleService);
    expect(component.userServiceAux).toBe(mockUserAuxService);
  });

  it('should initialize with selectedTab set to 0', () => {
    expect(component.selectedTab).toBe(0);
  });

  it('should change selectedTab when selectTab is called', () => {
    component.selectTab(1);
    expect(component.selectedTab).toBe(1);

    component.selectTab(2);
    expect(component.selectedTab).toBe(2);
  });

  it('should have tabs array with correct values', () => {
    expect(component.tabs).toEqual([
      { label: 'Categorias', component: 'CategoryForm' },
      { label: 'Marcas', component: 'ArticleForm' },
      { label: 'Articulos', component: 'BrandForm' }
    ]);
  });
});
