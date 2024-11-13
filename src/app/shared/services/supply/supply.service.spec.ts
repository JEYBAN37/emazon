import { TestBed } from '@angular/core/testing';
import { SupplyService } from './supply.service';
import { ApiFactoryService } from '../factory-api/api-factory.service';
import { of } from 'rxjs';
import { Supply } from '../../models/supply-interface';

describe('SupplyService', () => {
  let service: SupplyService;
  let apiFactoryMock: jest.Mocked<ApiFactoryService>;

  beforeEach(() => {
    // Create a mock instance of ApiFactoryService
    apiFactoryMock = {
      createPost: jest.fn(),
    } as any;

    // Configure the testing module
    TestBed.configureTestingModule({
      providers: [
        SupplyService,
        { provide: ApiFactoryService, useValue: apiFactoryMock },
      ],
    });

    service = TestBed.inject(SupplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call createPost and return the supply data', () => {
    const mockSupply: Supply[] = [
      { idArticle: 101, quantity: 5, state: 'active' },
      {  idArticle: 102, quantity: 3, state: 'inactive' },
    ];

    // Mock the return value of createPost to return an observable
    apiFactoryMock.createPost.mockReturnValue(of(mockSupply));

    service.fetchSupplyData(mockSupply).subscribe((response) => {
      expect(response).toEqual(mockSupply); // Check if the response matches the mock data
    });

    // Check if createPost was called with the correct parameters
    expect(apiFactoryMock.createPost).toHaveBeenCalledWith(
      'http://localhost:8091/company/addSupply/',
      mockSupply
    );
    expect(apiFactoryMock.createPost).toHaveBeenCalledTimes(1); // Ensure it was called once
  });

});
