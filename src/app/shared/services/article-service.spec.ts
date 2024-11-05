import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Article, ArticleService } from './article-service';
 // Adjust the path as necessary

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService]
    });
    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  describe('Article class properties', () => {
    it('should instantiate Article with default values', () => {
      const article = new Article();
      expect(article.price).toBe(0); // Default value for price
      expect(article.brand).toBeUndefined(); // Should be undefined initially
      expect(article.articleCategories).toEqual([]); // Should be an empty array initially
    });

    it('should create an article with specified properties', () => {
      const newArticle: Article = {
        name: 'New Article',
        description: 'Description of the new article',
        quantity: 10,
        price: 100, // Set price
        brand: 'Brand A', // Set brand
        articleCategories: [1, 2] // Set categories
      };

      expect(newArticle.name).toBe('New Article');
      expect(newArticle.description).toBe('Description of the new article');
      expect(newArticle.quantity).toBe(10);
      expect(newArticle.price).toBe(100); // Ensure price is set correctly
      expect(newArticle.brand).toBe('Brand A'); // Ensure brand is set correctly
      expect(newArticle.articleCategories).toEqual([1, 2]); // Ensure categories are set correctly
    });
  });

  describe('create', () => {
    it('should send a POST request and return the created article', () => {
      const newArticle: Article = {
        name: 'New Article',
        description: 'Description of the new article',
        quantity: 10,
        price: 100,
        brand: 'Brand A',
        articleCategories: [1, 2]
      };

      service.create(newArticle).subscribe((article) => {
        expect(article).toEqual(newArticle); // Expect the returned article to match the new article
      });

      const req = httpMock.expectOne('http://localhost:8086/admin/articles/');
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toContain('Bearer'); // Check if Authorization header is present
      req.flush(newArticle); // Mock the response
    });
  });

  describe('get', () => {
    it('should send a GET request and return a list of articles', () => {
      const articles: Article[] = [
        { name: 'Article 1', description: 'Desc 1', quantity: 5, price: 50, brand: 'Brand 1', articleCategories: [1] },
        { name: 'Article 2', description: 'Desc 2', quantity: 3, price: 30, brand: 'Brand 2', articleCategories: [2] }
      ];

      service.get(0, 10, true, 'name').subscribe((response) => {
        expect(response.length).toBe(2); // Check the length of the response array
        expect(response).toEqual(articles); // Check if response matches expected articles
      });

      const req = httpMock.expectOne('http://localhost:8086/secure/articles/?page=0&size=10&ascending=true');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toContain('Bearer'); // Check if Authorization header is present
      req.flush(articles); // Mock the response
    });
  });
});
