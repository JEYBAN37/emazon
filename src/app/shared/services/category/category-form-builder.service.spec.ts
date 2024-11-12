import { TestBed } from '@angular/core/testing';

import { CategoryFormBuilderService } from './category-form-builder.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

describe('CategoryFormBuilderService', () => {
  let service: CategoryFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [CategoryFormBuilderService, FormBuilder],
    });
    service = TestBed.inject(CategoryFormBuilderService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize article form with default values and validators', () => {
    const form: FormGroup = service.initCategoryForm();

    // Verificar que el formulario fue inicializado
    expect(form).toBeDefined();
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