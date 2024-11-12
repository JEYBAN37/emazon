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
    localStorage.clear();
  });

  afterEach(() => {
    // Ensure localStorage is cleared after each test
    localStorage.clear();
  });

  it('should retrieve token from localStorage', () => {
    const testToken = 'test-token';
    localStorage.setItem('auth_token', testToken);

    const token = authService.getToken();
    expect(token).toBe(testToken);
  });

  it('should return an empty string if no token is stored', () => {
    const token = authService.getToken();
    expect(token).toBe('');
  });

  it('should save the token to localStorage', () => {
    const testToken = 'new-test-token';
    authService.setToken(testToken);

    expect(localStorage.getItem('auth_token')).toBe(testToken);
  });

  it('should clear the token from localStorage', () => {
    localStorage.setItem('auth_token', 'token-to-clear');
    authService.clearToken();

    expect(localStorage.getItem('auth_token')).toBeNull();
  });
});
