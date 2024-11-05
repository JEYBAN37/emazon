import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Brand, BrandService } from './brand-service';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService]
    });
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  describe('Brand class properties', () => {
    it('should instantiate Brand with default values', () => {
      const brand = new Brand();
      expect(brand.name).toBeUndefined(); // Should be undefined initially
      expect(brand.description).toBeUndefined(); // Should be undefined initially
    });

    it('should create a brand with specified properties', () => {
      const newBrand: Brand = {
        name: 'Brand A',
        description: 'Description of Brand A'
      };

      expect(newBrand.name).toBe('Brand A');
      expect(newBrand.description).toBe('Description of Brand A');
    });
  });

  describe('create', () => {
    it('should send a POST request and return the created brand', () => {
      const newBrand: Brand = {
        name: 'Brand A',
        description: 'Description of Brand A'
      };

      service.create(newBrand).subscribe((brand) => {
        expect(brand).toEqual(newBrand); // Expect the returned brand to match the new brand
      });

      const req = httpMock.expectOne('http://localhost:8086/admin/brands/');
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toContain('Bearer'); // Check if Authorization header is present
      req.flush(newBrand); // Mock the response
    });
  });

  describe('get', () => {
    it('should send a GET request and return a list of brands', () => {
      const brands: Brand[] = [
        { name: 'Brand 1', description: 'Desc 1' },
        { name: 'Brand 2', description: 'Desc 2' }
      ];

      service.get(0, 10, true).subscribe((response) => {
        expect(response.length).toBe(2); // Check the length of the response array
        expect(response).toEqual(brands); // Check if response matches expected brands
      });

      const req = httpMock.expectOne('http://localhost:8086/secure/brands/?page=0&size=10&ascending=true');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toContain('Bearer'); // Check if Authorization header is present
      req.flush(brands); // Mock the response
    });
  });
});
