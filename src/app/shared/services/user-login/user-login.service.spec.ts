import { TestBed } from '@angular/core/testing';
import { UserLoginService } from './user-login.service';
import { of, throwError } from 'rxjs';
import { ApiFactoryService } from '../factory-api/api-factory.service';
import { User } from '../../models/user-interface';

// Mock the ApiFactoryService
class MockApiFactoryService {
  createPost<T>(url: string, body: T) {
    return of({} as T);  // Mocking the observable returned by createPost
  }
}

describe('UserLoginService', () => {
  let service: UserLoginService;
  let apiFactoryService: ApiFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserLoginService,  // Use the service class directly here
        { provide: ApiFactoryService, useClass: MockApiFactoryService }
      ]
    });

    service = TestBed.inject(UserLoginService);
    apiFactoryService = TestBed.inject(ApiFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call createPost with correct parameters when fetchUserData is called', () => {
    const user: User = {
      email: 'john.doe@example.com',
      password: 'password123'
    };

    const spy = jest.spyOn(apiFactoryService, 'createPost').mockReturnValue(of(user));

    service.fetchUser(user).subscribe(response => {
      expect(response).toEqual(user);
    });

    expect(spy).toHaveBeenCalledWith('http://localhost:8088/public/login', user);
  });

  it('should handle an error if fetchUserData fails', () => {
    const user: User = {
      email: 'john.doe@example.com',
      password: 'password123'
    };

    const spy = jest.spyOn(apiFactoryService, 'createPost').mockReturnValue(throwError(() => new Error('API error')));

    service.fetchUser(user).subscribe({
      next: () => fail('Expected an error, but got a successful response'),
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('API error');
      }
    });

    expect(spy).toHaveBeenCalledWith('http://localhost:8088/public/login', user);
  });
});
