import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptor } from './auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth-service.service';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  const testToken = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlkIjo5NSwic3ViIjoianNnYm1zQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMxNzA3ODE5LCJleHAiOjE3MzE3OTQyMTl9.5oCJGsk0fveyv031X2d8Yt3T8e-EQAjrFLcNlT1dKbM';

  beforeEach(() => {
    const authServiceMock = {
      getToken: jest.fn().mockReturnValue(testToken)
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header when token is available', () => {
    httpClient.get('/test').subscribe();

    const httpRequest = httpMock.expectOne('/test');
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${testToken}`);
  });

  it('should pass through the request unmodified if no token is present', () => {
    const authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    authService.getToken.mockReturnValueOnce('');

    httpClient.get('/test-no-token').subscribe();

    const httpRequest = httpMock.expectOne('/test-no-token');
    expect(httpRequest.request.headers.has('Authorization')).toBe(false);
  });

  it('should pass through the request unmodified if no token is present', () => {
    const authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    authService.getToken.mockReturnValueOnce('');
  
    httpClient.get('/test-no-token').subscribe();
  
    const httpRequest = httpMock.expectOne('/test-no-token');
    expect(httpRequest.request.headers.has('Authorization')).toBe(false);
  });
});
