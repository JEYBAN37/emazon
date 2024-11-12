import { TestBed } from '@angular/core/testing';

import { AuxUserService } from './aux-user.service';
import { ApiFactoryService } from '../factory-api/api-factory.service';
import { UserAux } from '../../models/aux-interface';
import { of } from 'rxjs';

describe('AuxUserService', () => {
  let service: AuxUserService;
  let apiFactoryMock: jest.Mocked<ApiFactoryService>;

  beforeEach(() => {
    const apiFactoryServiceMock = {
      createPost: jest.fn(),
    } as unknown as jest.Mocked<ApiFactoryService>;

    TestBed.configureTestingModule({
      providers: [
        AuxUserService,
        { provide: ApiFactoryService, useValue: apiFactoryServiceMock },
      ],
    });

    service = TestBed.inject(AuxUserService);
    apiFactoryMock = TestBed.inject(ApiFactoryService) as jest.Mocked<ApiFactoryService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call createPost with the correct URL and article data', (done) => {

    const mockArticle: UserAux = {
      name: 'Test Article',
      lastName: 'Test Article',
      dni: 'Test Article',
      telephone: 'Test Article',
      dateAge: 'Test Article',
      email: 'Test Article',
      password: 'Test Article',
    };

    // Set up the mock to return an observable of mockArticle
    apiFactoryMock.createPost.mockReturnValue(of(mockArticle));

    service.fetchUserAuxData(mockArticle).subscribe((result) => {
      expect(result).toEqual(mockArticle);
      done();
    });

    expect(apiFactoryMock.createPost).toHaveBeenCalledWith(service['apiUrl'], mockArticle);
  });
});
