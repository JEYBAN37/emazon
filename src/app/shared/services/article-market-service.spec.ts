import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ArticleMarketService } from './article-market-service';

describe('ArticleMarketService', () => {
  let service: ArticleMarketService;
  let httpMock: HttpTestingController;

  const mockToken = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlkIjo4OCwic3ViIjoiamVzc0BleGFtcGxlLmNvbSIsImlhdCI6MTczMDc3Nzg0MywiZXhwIjoxNzMwODY0MjQzfQ.U2I8ROtdU4lJ0YdmQ0ElL978xGJraCdc825gAVUdQmI';
  const apiUrl = 'http://localhost:8086/secure/articles/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleMarketService],
    });

    service = TestBed.inject(ArticleMarketService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the correct headers and token', () => {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(headers.get('Content-Type')).toBe('application/json');
    expect(headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
  });

  it('should call the API with correct query params and headers without byName', () => {
    const page = 1;
    const size = 10;
    const ascending = true;

    service.get(page, size, ascending, null).subscribe((articles) => {
      expect(articles).toBeTruthy();
    });

    const req = httpMock.expectOne((request) => 
      request.url === apiUrl &&
      request.params.has('page') &&
      request.params.get('page') === page.toString() &&
      request.params.has('size') &&
      request.params.get('size') === size.toString() &&
      request.params.has('ascending') &&
      request.params.get('ascending') === ascending.toString()
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush([]); // Mock an empty array response for ArticleMarket[]
  });

  it('should call the API with correct query params and headers with byName', () => {
    const page = 1;
    const size = 10;
    const ascending = true;
    const byName = 'Sample Name';

    service.get(page, size, ascending, byName).subscribe((articles) => {
      expect(articles).toBeTruthy();
    });

    const req = httpMock.expectOne((request) => 
      request.url === apiUrl &&
      request.params.has('page') &&
      request.params.get('page') === page.toString() &&
      request.params.has('size') &&
      request.params.get('size') === size.toString() &&
      request.params.has('ascending') &&
      request.params.get('ascending') === ascending.toString() &&
      request.params.has('byName') &&
      request.params.get('byName') === byName
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush([]); // Mock an empty array response for ArticleMarket[]
  });
});
