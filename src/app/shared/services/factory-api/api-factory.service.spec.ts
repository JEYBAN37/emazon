import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiFactoryService } from './api-factory.service';
import { HttpParams } from '@angular/common/http';

describe('ApiFactoryService', () => {
  let service: ApiFactoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiFactoryService]
    });

    service = TestBed.inject(ApiFactoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createGet', () => {
    it('should perform a GET request with parameters', () => {
      const endpoint = 'http://example.com/api';
      const params = { key1: 'value1', key2: 'value2' };
      const expectedResponse = { data: 'test data' };

      service.createGet(endpoint, params).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne((request) =>
        request.url === endpoint &&
        request.params.get('key1') === 'value1' &&
        request.params.get('key2') === 'value2'
      );
      expect(req.request.method).toBe('GET');
      req.flush(expectedResponse);
    });

    it('should perform a GET request without parameters', () => {
      const endpoint = 'http://example.com/api';
      const expectedResponse = { data: 'test data' };

      service.createGet(endpoint).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(endpoint);
      expect(req.request.method).toBe('GET');
      req.flush(expectedResponse);
    });
  });

  describe('createPost', () => {
    it('should perform a POST request with body and parameters', () => {
      const endpoint = 'http://example.com/api';
      const body = { name: 'Test' };
      const params = { param1: '123' };
      const expectedResponse = { success: true };

      service.createPost(endpoint, body, params).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne((request) =>
        request.url === endpoint &&
        request.params.get('param1') === '123'
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(body);
      req.flush(expectedResponse);
    });

    it('should perform a POST request with body only', () => {
      const endpoint = 'http://example.com/api';
      const body = { name: 'Test' };
      const expectedResponse = { success: true };

      service.createPost(endpoint, body).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(endpoint);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(body);
      req.flush(expectedResponse);
    });
  });

  describe('createPut', () => {
    it('should perform a PUT request with body and parameters', () => {
      const endpoint = 'http://example.com/api';
      const body = { name: 'Update Test' };
      const params = { param1: '456' };
      const expectedResponse = { success: true };

      service.createPut(endpoint, body, params).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne((request) =>
        request.url === endpoint &&
        request.params.get('param1') === '456'
      );
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(body);
      req.flush(expectedResponse);
    });

    it('should perform a PUT request with body only', () => {
      const endpoint = 'http://example.com/api';
      const body = { name: 'Update Test' };
      const expectedResponse = { success: true };

      service.createPut(endpoint, body).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(endpoint);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(body);
      req.flush(expectedResponse);
    });
  });
});
