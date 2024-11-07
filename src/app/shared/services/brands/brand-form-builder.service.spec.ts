import { TestBed } from '@angular/core/testing';

import { BrandFormBuilderService } from './brand-form-builder.service';
import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

describe('BrandFormBuilderService', () => {
  let service: BrandFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize article form with default values and validators', () => {
    const form: FormGroup = service.initBrandForm();

    // Verificar que el formulario fue inicializado
    expect(form).toBeTruthy();
    expect(form.controls).toHaveProperty('name');
    expect(form.controls).toHaveProperty('description');


    // Verificar los valores iniciales de cada control
    expect(form.get('name')?.value).toBe('');
    expect(form.get('description')?.value).toBe('');

    // Verificar validadores utilizando la función auxiliar
    expect(hasValidator(form.get('name'), Validators.required)).toBe(false);
    expect(hasValidator(form.get('name'), Validators.maxLength(50))).toBe(false);

    expect(hasValidator(form.get('description'), Validators.required)).toBe(false);
    expect(hasValidator(form.get('description'), Validators.maxLength(90))).toBe(false);

  });
});

function hasValidator(control: AbstractControl | null, validator: ValidatorFn): boolean {
  if (!control || !control.validator) return false;

  const validatorFn = control.validator({} as AbstractControl);
  return validatorFn && Object.values(validatorFn).includes(validator) || false;
}
