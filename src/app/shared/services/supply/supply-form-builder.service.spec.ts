import { TestBed } from '@angular/core/testing';
import { SupplyFormBuilderService } from './supply-form-builder.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

describe('SupplyFormBuilderService', () => {
  let service: SupplyFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplyFormBuilderService, FormBuilder],
    });
    service = TestBed.inject(SupplyFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize a form with the correct structure and validators', () => {
    const form = service.initSupplyForm();

    // Verify the form has the correct controls and validators
    const idArticle = form.get('idArticle');
    const quantity = form.get('quantity');
    const state = form.get('state');

    expect(idArticle).toBeTruthy();
    expect(quantity).toBeTruthy();
    expect(state).toBeTruthy();

    // Check initial value (empty string)
    expect(idArticle?.value).toBe('');
    expect(quantity?.value).toBe('');
    expect(state?.value).toBe('');

    // Check validators
    expect(idArticle?.hasValidator(Validators.required)).toBe(true);
    expect(idArticle?.hasValidator(Validators.pattern('^[0-9]*$'))).toBe(false);

    expect(quantity?.hasValidator(Validators.required)).toBe(true);
    expect(quantity?.hasValidator(Validators.pattern('^[0-9]*$'))).toBe(false);

    expect(state?.hasValidator(Validators.required)).toBe(true);
  });

  it('should return a form group', () => {
    const form = service.initSupplyForm();
    expect(form instanceof FormGroup).toBe(true);
  });
});
