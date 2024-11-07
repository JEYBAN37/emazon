import { TestBed } from '@angular/core/testing';
import { ArticleService } from './article.service';
import { ApiFactoryService } from 'src/app/shared/services/factory-api/api-factory.service';
import { of } from 'rxjs';
import { Article } from '../../models/article-interface';

describe('ArticleService', () => {
  let service: ArticleService;
  let apiFactoryMock: jest.Mocked<ApiFactoryService>;

  beforeEach(() => {
    // Creamos un mock del ApiFactoryService
    apiFactoryMock = {
      createGet: jest.fn(),
    } as any;

    // Configuramos el entorno de pruebas
    TestBed.configureTestingModule({
      providers: [
        ArticleService,
        { provide: ApiFactoryService, useValue: apiFactoryMock },
      ],
    });

    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call fetchArticleData and return article data', () => {
    const mockArticle: Article = {
      name: 'Test Article',
      description: 'Test Description',
      quantity: 10,
      price: 100,
      brand: 'Test Brand',
      articleCategories: ['Category1'],
    };

    // Simulamos la respuesta de la API
    apiFactoryMock.createGet.mockReturnValue(of(mockArticle));

    // Llamamos al método que queremos probar
    service.fetchArticleData(mockArticle).subscribe((result) => {
      expect(result).toEqual(mockArticle);
      expect(apiFactoryMock.createGet).toHaveBeenCalledWith('http://localhost:8086/admin/articles/', mockArticle);
    });
  });

  it('should handle errors when API call fails', () => {
    const mockError = new Error('Failed to fetch data');
    apiFactoryMock.createGet.mockReturnValue(of(mockError));

    service.fetchArticleData({} as Article).subscribe({
      next: () => {
        fail('expected an error, not data');
      },
      error: (error) => {
        expect(error).toBe(mockError);
      },
    });
  });
});
