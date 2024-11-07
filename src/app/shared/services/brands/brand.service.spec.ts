import { TestBed } from '@angular/core/testing';
import { BrandService } from './brand.service';
import { ApiFactoryService } from '../factory-api/api-factory.service';
import { Brand } from '../../models/brand-interface';
import { of } from 'rxjs';



describe('BrandService', () => {
  let service: BrandService;
  let apiFactoryMock: jest.Mocked<ApiFactoryService>;
  beforeEach(() => {
    // Creamos un mock del ApiFactoryService
    apiFactoryMock = {
      createGet: jest.fn(),
    } as any;

    // Configuramos el entorno de pruebas
    TestBed.configureTestingModule({
      providers: [
        BrandService,
        { provide: ApiFactoryService, useValue: apiFactoryMock },
      ],
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
    apiFactoryMock.createGet.mockReturnValue(of(mockBrand));

    // Llamamos al método que queremos probar
    service.fetchBrandData(mockBrand).subscribe((result) => {
      expect(result).toEqual(mockBrand);
      expect(apiFactoryMock.createGet).toHaveBeenCalledWith('http://localhost:8086/admin/brands/', mockBrand);
    });
  });

  it('should handle errors when API call fails', () => {
    const mockError = new Error('Failed to fetch data');
    apiFactoryMock.createGet.mockReturnValue(of(mockError));

    service.fetchBrandData({} as Brand).subscribe({
      next: () => {
        fail('expected an error, not data');
      },
      error: (error) => {
        expect(error).toBe(mockError);
      },
    });
  });
});
});