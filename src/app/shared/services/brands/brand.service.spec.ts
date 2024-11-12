import { TestBed } from '@angular/core/testing';
import { BrandService } from './brand.service';
import { ApiFactoryService } from '../factory-api/api-factory.service';
import { Brand } from '../../models/brand-interface';
import { of } from 'rxjs';

describe('BrandService', () => {
  let service: BrandService;
  let apiFactoryMock: jest.Mocked<ApiFactoryService>;
  beforeEach(() => {
    const apiFactoryServiceMock = {
      createPost: jest.fn(),
    } as unknown as jest.Mocked<ApiFactoryService>;

    TestBed.configureTestingModule({
      providers: [
        BrandService,
        { provide: ApiFactoryService, useValue: apiFactoryServiceMock },
      ],
    });

    service = TestBed.inject(BrandService);
    apiFactoryMock = TestBed.inject(ApiFactoryService) as jest.Mocked<ApiFactoryService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call fetchArticleData and return article data', () => {
      const mockBrand: Brand = {
      name: 'Test Article',
      description: 'Test Description',
    };

    // Simulamos la respuesta de la API
    apiFactoryMock.createPost.mockReturnValue(of(mockBrand));

    // Llamamos al método que queremos probar
    service.fetchBrandData(mockBrand).subscribe((result) => {
      expect(result).toEqual(mockBrand);
    expect(apiFactoryMock.createPost).toHaveBeenCalledWith(service['apiUrl'], mockBrand);
    });
  });
});