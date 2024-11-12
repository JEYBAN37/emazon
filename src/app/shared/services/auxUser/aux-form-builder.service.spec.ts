import { TestBed } from '@angular/core/testing';

import { AuxFormBuilderService } from './aux-form-builder.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

describe('AuxFormBuilderService', () => {
  let service: AuxFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [AuxFormBuilderService, FormBuilder],
    });
    service = TestBed.inject(AuxFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize a form with correct default values and validators', () => {
    const form = service.initAuxUserForm();

    // Check that the form group is defined and has all the expected controls
    expect(form).toBeDefined();
    expect(form.controls['name']).toBeDefined();
    expect(form.controls['lastName']).toBeDefined();
    expect(form.controls['dni']).toBeDefined();
    expect(form.controls['telephone']).toBeDefined();
    expect(form.controls['dateAge']).toBeDefined();
    expect(form.controls['email']).toBeDefined();
    expect(form.controls['password']).toBeDefined();

    // Check default values
    expect(form.controls['name'].value).toBe('');
    expect(form.controls['lastName'].value).toBe('');
    expect(form.controls['dni'].value).toBe('');
    expect(form.controls['telephone'].value).toBe('');
    expect(form.controls['dateAge'].value).toBe('');
    expect(form.controls['email'].value).toEqual('');
    expect(form.controls['password'].value).toBe('');

    // Helper function to check if a control has a specific validator
    const hasValidator = (control:any, validator:any) => {
      const validators = control.validator ? [control.validator] : [];
      return validators.some(v => v === validator || v.name === validator.name);
    };

    // Check validators for each form control
    expect(hasValidator(form.controls['name'], Validators.required)).toBe(false);
    expect(hasValidator(form.controls['name'], Validators.maxLength(50))).toBe(true);

    expect(hasValidator(form.controls['lastName'], Validators.required)).toBe(false);
    expect(hasValidator(form.controls['lastName'], Validators.maxLength(90))).toBe(true);

 
  });
});
