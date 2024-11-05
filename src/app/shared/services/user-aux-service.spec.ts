import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User, UserAuxService } from './user-aux-service';

describe('UserAuxService', () => {
  let service: UserAuxService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserAuxService]
    });
    service = TestBed.inject(UserAuxService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes no satisfechas
  });

  it('debería enviar una solicitud POST con el objeto User y un token de autorización', () => {
    const newUser: User = {
      name: 'Juan',
      lastName: 'Pérez',
      dni: 12345678,
      telephone: 5551234567,
      brand: 'MarcaX',
      dateAge: new Date('1990-01-01'),
      email: 'juan@example.com',
      password: 'password123'
    };

    service.create(newUser).subscribe((response) => {
      expect(response).toEqual(newUser);
    });

    const req = httpMock.expectOne('http://localhost:8088/admin/register/aux_bodega');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service['token']}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(newUser);

    req.flush(newUser); // Simula respuesta exitosa del servidor con el objeto creado
  });

  it('debería manejar el error cuando el servidor responde con un error', () => {
    const newUser: User = {
      name: 'Juan',
      lastName: 'Pérez',
      dni: 12345678,
      telephone: 5551234567,
      brand: 'MarcaX',
      dateAge: new Date('1990-01-01'),
      email: 'juan@example.com',
      password: 'password123'
    };

    service.create(newUser).subscribe({
      next: () => fail('Debería haber fallado'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.error.message).toBe('Error en el servidor');
      }
    });

    const req = httpMock.expectOne('http://localhost:8088/admin/register/aux_bodega');
    req.flush({ message: 'Error en el servidor' }, { status: 500, statusText: 'Internal Server Error' });
  });
});
