import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);

    // Clear localStorage before each test to ensure test isolation
    sessionStorage.clear();
  });


  afterEach(() => {
    // Ensure localStorage is cleared after each test
    localStorage.clear();
  });

  it('should retrieve token from localStorage', () => {
    const testToken = 'test-token';
    sessionStorage.setItem('auth_token', testToken);

    const token = authService.getToken();
    expect(token).toBe('test-token');
  });


  it('should return an empty string if no token is stored', () => {
    const token = authService.getToken();
    expect(token).toBe('');
  });

  it('should save the token to localStorage', () => {
    const testToken = '';
    authService.setToken(testToken);

    expect(sessionStorage.getItem('auth_token')).toBe('');
  });

  it('should clear the token from localStorage', () => {
    sessionStorage.setItem('auth_token', 'token-to-clear');
    authService.clearToken();

    expect(sessionStorage.getItem('auth_token')).toBeNull();
  });
});
