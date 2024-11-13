import { TestBed } from '@angular/core/testing';
import { UserLoginFormBuilderService } from './user-login-form-builder.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

describe('UserLoginFormBuilderService', () => {
  let service: UserLoginFormBuilderService;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [UserLoginFormBuilderService, FormBuilder],
    });
    service = TestBed.inject(UserLoginFormBuilderService);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize user login form with email and password fields', () => {
    const form: FormGroup = service.InicialUserLoginForm();

    // Check that the form is defined
    expect(form).toBeDefined();

    // Check the form controls (email and password)
    expect(form.controls).toHaveProperty('email');
    expect(form.controls).toHaveProperty('password');

    // Check if initial values are empty
    expect(form.get('email')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');

    // Check the validators for email and password fields
    expect(form.get('email')?.hasValidator(Validators.required)).toBe(true);
    expect(form.get('password')?.hasValidator(Validators.required)).toBe(true);
  });
});
