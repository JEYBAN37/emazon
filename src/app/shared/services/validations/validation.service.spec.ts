import { TestBed } from '@angular/core/testing';
import { ValidationService } from './validation.service';
import { FormGroup, FormControl } from '@angular/forms';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationService],
    });
    service = TestBed.inject(ValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should mark all controls as touched', () => {
    // Crear un FormGroup con algunos controles
    const formGroup = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
    });

    // Llamamos al método markFormGroupTouched
    service.markFormGroupTouched(formGroup);

    // Verificamos que todos los controles se hayan marcado como tocados
    expect(formGroup.controls['name'].touched).toBeTruthy();
    expect(formGroup.controls['email'].touched).toBeTruthy();
  });

  it('should mark nested controls as touched', () => {
    // Crear un FormGroup con controles anidados
    const formGroup = new FormGroup({
      name: new FormControl(''),
      address: new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
      }),
    });

    // Llamamos al método markFormGroupTouched
    service.markFormGroupTouched(formGroup);

    // Verificamos que los controles anidados también se marquen como tocados
    expect(formGroup.controls['name'].touched).toBeTruthy();
    expect((formGroup.controls['address'] as FormGroup).controls['street'].touched).toBeTruthy();
    expect((formGroup.controls['address'] as FormGroup).controls['city'].touched).toBeTruthy();
  });

  it('should handle empty form groups', () => {
    // Crear un FormGroup vacío
    const formGroup = new FormGroup({});

    // Llamamos al método markFormGroupTouched
    service.markFormGroupTouched(formGroup);

    // Verificamos que no se haya lanzado ningún error (ya que no hay controles)
    expect(true).toBe(true);
  });
});
