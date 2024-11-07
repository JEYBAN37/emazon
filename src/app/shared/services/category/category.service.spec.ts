import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { ApiFactoryService } from '../factory-api/api-factory.service';
import { Category } from '../../models/category-interface';
import { of } from 'rxjs';


describe('CategoryService', () => {
  let service: CategoryService;
  let apiFactoryMock: jest.Mocked<ApiFactoryService>;

  beforeEach(() => {
    // Creamos un mock del ApiFactoryService
    apiFactoryMock = {
      createGet: jest.fn(),
    } as any;

    // Configuramos el entorno de pruebas
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        { provide: ApiFactoryService, useValue: apiFactoryMock },
      ],
    });

    service = TestBed.inject(CategoryService);
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
    apiFactoryMock.createGet.mockReturnValue(of(mockCategory));

    // Llamamos al método que queremos probar
    service.fetchCategoryData(mockCategory).subscribe((result) => {
      expect(result).toEqual(mockCategory);
      expect(apiFactoryMock.createGet).toHaveBeenCalledWith('http://localhost:8086/admin/category/', mockCategory);
    });
  });

  it('should handle errors when API call fails', () => {
    const mockError = new Error('Failed to fetch data');
    apiFactoryMock.createGet.mockReturnValue(of(mockError));

    service.fetchCategoryData({} as Category).subscribe({
      next: () => {
        fail('expected an error, not data');
      },
      error: (error) => {
        expect(error).toBe(mockError);
      },
    });
  });

});
