import { TestBed } from '@angular/core/testing';
import { UserRegisterFormBuilderService } from './user-register-form-builder.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

describe('UserRegisterFormBuilderService', () => {
  let service: UserRegisterFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [UserRegisterFormBuilderService, FormBuilder],
    });
    service = TestBed.inject(UserRegisterFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize user form with default values and validators', () => {
    const form: FormGroup = service.initUserForm();

    // Verify the form initialization
    expect(form).toBeDefined();
    expect(form.controls).toHaveProperty('name');
    expect(form.controls).toHaveProperty('confirmPassword');
    expect(form.controls).toHaveProperty('lastName');
    expect(form.controls).toHaveProperty('dni');
    expect(form.controls).toHaveProperty('telephone');
    expect(form.controls).toHaveProperty('dateAge');
    expect(form.controls).toHaveProperty('email');
    expect(form.controls).toHaveProperty('password');

    // Verify default values for each control
    expect(form.get('name')?.value).toBe('');
    expect(form.get('confirmPassword')?.value).toBe('');
    expect(form.get('lastName')?.value).toBe('');
    expect(form.get('dni')?.value).toBe('');
    expect(form.get('telephone')?.value).toBe('');
    expect(form.get('dateAge')?.value).toBe('');
    expect(form.get('email')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');

    // Verify validators using the helper function
    expect(hasValidator(form.get('name'), Validators.required)).toBe(false);
    expect(hasValidator(form.get('name'), Validators.maxLength(50))).toBe(false);

    expect(hasValidator(form.get('confirmPassword'), Validators.required)).toBe(false);

    expect(hasValidator(form.get('lastName'), Validators.required)).toBe(false);
    expect(hasValidator(form.get('lastName'), Validators.maxLength(90))).toBe(false);

    expect(hasValidator(form.get('dni'), Validators.required)).toBe(false);
    expect(hasValidator(form.get('dni'), Validators.maxLength(18))).toBe(false);

    expect(hasValidator(form.get('telephone'), Validators.required)).toBe(false);
    expect(hasValidator(form.get('telephone'), Validators.maxLength(13))).toBe(false);

    expect(hasValidator(form.get('dateAge'), Validators.required)).toBe(false);

    expect(hasValidator(form.get('email'), Validators.required)).toBe(false);
    expect(hasValidator(form.get('email'), Validators.email)).toBe(false);

    expect(hasValidator(form.get('password'), Validators.required)).toBe(false);
  });
});

function hasValidator(control: AbstractControl | null, validator: ValidatorFn): boolean {
  if (!control || !control.validator) return false;

  const validatorFn = control.validator({} as AbstractControl);
  return validatorFn && Object.values(validatorFn).includes(validator) || false;
}
