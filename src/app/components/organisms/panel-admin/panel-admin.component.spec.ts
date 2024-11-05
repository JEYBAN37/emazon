import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelAdminComponent } from './panel-admin.component';
import { CategoryService } from 'src/app/shared/services/category-service';
import { BrandService } from 'src/app/shared/services/brand-service';
import { ArticleService } from 'src/app/shared/services/article-service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PanelAdminComponent', () => {
  let component: PanelAdminComponent;
  let fixture: ComponentFixture<PanelAdminComponent>;
  let categoryService: CategoryService;
  let brandService: BrandService;
  let articleService: ArticleService;

  beforeEach(() => {
    // Create mock instances for the services
    categoryService = {} as CategoryService;
    brandService = {} as BrandService;
    articleService = {} as ArticleService;

    TestBed.configureTestingModule({
      declarations: [PanelAdminComponent],
      providers: [
        { provide: CategoryService, useValue: categoryService },
        { provide: BrandService, useValue: brandService },
        { provide: ArticleService, useValue: articleService },
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements in the template
    });

    fixture = TestBed.createComponent(PanelAdminComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize services in the constructor', () => {
    expect(component.stockServiceCategory).toBe(categoryService);
    expect(component.stockServiceBrand).toBe(brandService);
    expect(component.stockServiceArticle).toBe(articleService);
  });

  it('should initialize selectedTab to 0', () => {
    expect(component.selectedTab).toBe(0);
  });

  it('should update selectedTab when selectTab is called', () => {
    component.selectTab(1);
    expect(component.selectedTab).toBe(1);
    component.selectTab(2);
    expect(component.selectedTab).toBe(2);
  });

  it('should have correct tabs defined', () => {
    expect(component.tabs.length).toBe(3);
    expect(component.tabs).toEqual([
      { label: 'Categorias', component: 'CategoryForm' },
      { label: 'Marcas', component: 'ArticleForm' },
      { label: 'Articulos', component: 'BrandForm' },
    ]);
  });
});
