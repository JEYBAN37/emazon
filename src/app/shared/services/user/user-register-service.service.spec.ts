import { TestBed } from '@angular/core/testing';
import { UserRegisterService } from './user-register.service';
import { ApiFactoryService } from '../factory-api/api-factory.service';
import { of } from 'rxjs';
import { UserAux } from '../../models/aux-interface';

// Mock the ApiFactoryService
class MockApiFactoryService {
  createPost<T>(url: string, body: T) {
    return of({} as T);  // Mocking the observable returned by createPost
  }
}

describe('UserRegisterService', () => {
  let service: UserRegisterService;
  let apiFactoryService: ApiFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserRegisterService,
        { provide: ApiFactoryService, useClass: MockApiFactoryService }
      ]
    });

    service = TestBed.inject(UserRegisterService);
    apiFactoryService = TestBed.inject(ApiFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call createPost with correct parameters when fetchUserData is called', () => {
    const user: UserAux = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    };

    const spy = jest.spyOn(apiFactoryService, 'createPost').mockReturnValue(of(user));

    service.fetchUserData(user).subscribe(response => {
      expect(response).toEqual(user);
    });

    expect(spy).toHaveBeenCalledWith('http://localhost:8088/public/register/client', user);
  });

  it('should handle an error if fetchUserData fails', () => {
    const user: UserAux = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    };

    const spy = jest.spyOn(apiFactoryService, 'createPost').mockReturnValue(of({}));

    service.fetchUserData(user).subscribe({
      next: (response) => {
        expect(response).toEqual({});  // Assuming empty object as mock response
      },
      error: (err) => {
        fail('Expected successful API call, but received an error');
      }
    });

    expect(spy).toHaveBeenCalledWith('http://localhost:8088/public/register/client', user);
  });
});
