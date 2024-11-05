import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Category, CategoryService } from './category-service';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  describe('Category class properties', () => {
    it('should instantiate Category with default values', () => {
      const category = new Category();
      expect(category.name).toBeUndefined(); // Should be undefined initially
      expect(category.description).toBeUndefined(); // Should be undefined initially
    });

    it('should create a category with specified properties', () => {
      const newCategory: Category = {
        name: 'Electronics',
        description: 'Devices and gadgets'
      };

      expect(newCategory.name).toBe('Electronics');
      expect(newCategory.description).toBe('Devices and gadgets');
    });
  });

  describe('create', () => {
    it('should send a POST request and return the created category', () => {
      const newCategory: Category = {
        name: 'Electronics',
        description: 'Devices and gadgets'
      };

      service.create(newCategory).subscribe((category) => {
        expect(category).toEqual(newCategory); // Expect the returned category to match the new category
      });

      const req = httpMock.expectOne('http://localhost:8086/admin/category/');
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toContain('Bearer'); // Check if Authorization header is present
      req.flush(newCategory); // Mock the response
    });
  });

  describe('get', () => {
    it('should send a GET request and return a list of categories', () => {
      const categories: Category[] = [
        { name: 'Electronics', description: 'Devices and gadgets' },
        { name: 'Furniture', description: 'Home and office furniture' }
      ];

      service.get(0, 10, true).subscribe((response) => {
        expect(response.length).toBe(2); // Check the length of the response array
        expect(response).toEqual(categories); // Check if response matches expected categories
      });

      const req = httpMock.expectOne('http://localhost:8086/secure/category/?page=0&size=10&ascending=true');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toContain('Bearer'); // Check if Authorization header is present
      req.flush(categories); // Mock the response
    });
  });
});
