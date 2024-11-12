import { TestBed } from '@angular/core/testing';
import { ArticleService } from './article.service';
import { ApiFactoryService } from 'src/app/shared/services/factory-api/api-factory.service';
import { of } from 'rxjs';
import { Article } from '../../models/article-interface';

describe('ArticleService', () => {
  let service: ArticleService;
  let apiFactoryService: jest.Mocked<ApiFactoryService>;

  beforeEach(() => {
    const apiFactoryServiceMock = {
      createPost: jest.fn(),
    } as unknown as jest.Mocked<ApiFactoryService>;

    TestBed.configureTestingModule({
      providers: [
        ArticleService,
        { provide: ApiFactoryService, useValue: apiFactoryServiceMock },
      ],
    });

    service = TestBed.inject(ArticleService);
    apiFactoryService = TestBed.inject(ApiFactoryService) as jest.Mocked<ApiFactoryService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call createPost with the correct URL and article data', (done) => {

    const mockArticle: Article = {
      name: 'Test Article',
      quantity: 100,
      price: 20,
      brand:1,
    };

    // Set up the mock to return an observable of mockArticle
    apiFactoryService.createPost.mockReturnValue(of(mockArticle));

    service.fetchArticleData(mockArticle).subscribe((result) => {
      expect(result).toEqual(mockArticle);
      done();
    });

    expect(apiFactoryService.createPost).toHaveBeenCalledWith(service['apiUrl'], mockArticle);
  });
});
