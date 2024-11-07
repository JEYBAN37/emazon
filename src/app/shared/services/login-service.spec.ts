import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService, Username } from './login-service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no outstanding requests are pending
    httpMock.verify();
  });

  it('should create an instance of LoginService', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to login', () => {
    const dummyUser: Username = { email: 'test@example.com', password: 'password' };
    
    service.create(dummyUser).subscribe(response => {
      expect(response).toEqual(dummyUser);
    });

    const req = httpMock.expectOne('http://localhost:8086/public/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyUser);

    // Simulate a successful response
    req.flush(dummyUser);
  });

  it('should verify that there are no outstanding HTTP requests', () => {
    const dummyUser: Username = { email: 'test@example.com', password: 'password' };

    service.create(dummyUser).subscribe();

    // Expect one request to be made
    const req = httpMock.expectOne('http://localhost:8086/public/login');
    req.flush(dummyUser); // Resolve the request

    // At this point, httpMock.verify() should pass without throwing an error
    httpMock.verify();
  });
});
