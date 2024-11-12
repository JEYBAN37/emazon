import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleFormBuilderService } from './article-form-builder.service';

describe('ArticleFormBuilderService', () => {
  let service: ArticleFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [ArticleFormBuilderService, FormBuilder],
    });
    service = TestBed.inject(ArticleFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize a form with correct default values and validators', () => {
    const form = service.initArticleForm();

    // Check that the form group is defined and has all the expected controls
    expect(form).toBeDefined();
    expect(form.controls['name']).toBeDefined();
    expect(form.controls['description']).toBeDefined();
    expect(form.controls['quantity']).toBeDefined();
    expect(form.controls['price']).toBeDefined();
    expect(form.controls['brand']).toBeDefined();
    expect(form.controls['articleCategories']).toBeDefined();

    // Check default values
    expect(form.controls['name'].value).toBe('');
    expect(form.controls['description'].value).toBe('');
    expect(form.controls['quantity'].value).toBe('');
    expect(form.controls['price'].value).toBe('');
    expect(form.controls['brand'].value).toBe('');
    expect(form.controls['articleCategories'].value).toEqual([]);

    // Helper function to check if a control has a specific validator
    const hasValidator = (control:any, validator:any) => {
      const validators = control.validator ? [control.validator] : [];
      return validators.some(v => v === validator || v.name === validator.name);
    };

    // Check validators for each form control
    expect(hasValidator(form.controls['name'], Validators.required)).toBe(false);
    expect(hasValidator(form.controls['name'], Validators.maxLength(50))).toBe(true);

    expect(hasValidator(form.controls['description'], Validators.required)).toBe(false);
    expect(hasValidator(form.controls['description'], Validators.maxLength(90))).toBe(true);

 
  });
});
