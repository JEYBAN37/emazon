import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { ApiFactoryService } from '../factory-api/api-factory.service';
import { Category } from '../../models/category-interface';
import { of } from 'rxjs';


describe('CategoryService', () => {
  let service: CategoryService;
  let apiFactoryMock: jest.Mocked<ApiFactoryService>;
  beforeEach(() => {
    const apiFactoryServiceMock = {
      createPost: jest.fn(),
    } as unknown as jest.Mocked<ApiFactoryService>;

    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        { provide: ApiFactoryService, useValue: apiFactoryServiceMock },
      ],
    });

    service = TestBed.inject(CategoryService);
    apiFactoryMock = TestBed.inject(ApiFactoryService) as jest.Mocked<ApiFactoryService>;
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call fetchArticleData and return article data', () => {
    const mockCategory: Category = {
      name: 'Test Article',
      description: 'Test Description',
    };

    // Simulamos la respuesta de la API
    apiFactoryMock.createPost.mockReturnValue(of(mockCategory));

    // Llamamos al método que queremos probar
    service.fetchCategoryData(mockCategory).subscribe((result) => {
      expect(result).toEqual(mockCategory);
      expect(apiFactoryMock.createPost).toHaveBeenCalledWith(service['apiUrl'], mockCategory);
    });
  });
});
