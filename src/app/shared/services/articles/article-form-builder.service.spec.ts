import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ArticleFormBuilderService } from './article-form-builder.service';

describe('ArticleFormBuilderService', () => {
  let service: ArticleFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder, ArticleFormBuilderService]
    });
    service = TestBed.inject(ArticleFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize article form with default values and validators', () => {
    const form: FormGroup = service.initArticleForm();

    // Verificar que el formulario fue inicializado
    expect(form).toBeTruthy();
    expect(form.controls).toHaveProperty('name');
    expect(form.controls).toHaveProperty('description');
    expect(form.controls).toHaveProperty('quantity');
    expect(form.controls).toHaveProperty('price');
    expect(form.controls).toHaveProperty('brand');
    expect(form.controls).toHaveProperty('articleCategories');

    // Verificar los valores iniciales de cada control
    expect(form.get('name')?.value).toBe('');
    expect(form.get('description')?.value).toBe('');
    expect(form.get('quantity')?.value).toBe('');
    expect(form.get('price')?.value).toBe('');
    expect(form.get('brand')?.value).toBe('');
    expect(form.get('articleCategories')?.value).toEqual([]);

    // Verificar validadores utilizando la función auxiliar
    expect(hasValidator(form.get('name'), Validators.required)).toBe(false);
    expect(hasValidator(form.get('name'), Validators.maxLength(50))).toBe(false);

    expect(hasValidator(form.get('description'), Validators.required)).toBe(false);
    expect(hasValidator(form.get('description'), Validators.maxLength(90))).toBe(false);

    expect(hasValidator(form.get('quantity'), Validators.required)).toBe(false);
    expect(hasValidator(form.get('price'), Validators.required)).toBe(false);
    expect(hasValidator(form.get('brand'), Validators.required)).toBe(false);
    expect(hasValidator(form.get('articleCategories'), Validators.required)).toBe(false);
  });
});

/**
 * Helper function to check if a specific validator is present on a control
 */
function hasValidator(control: AbstractControl | null, validator: ValidatorFn): boolean {
  if (!control || !control.validator) return false;

  const validatorFn = control.validator({} as AbstractControl);
  return validatorFn && Object.values(validatorFn).includes(validator) || false;
}
