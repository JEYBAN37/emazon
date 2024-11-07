import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { BrandService } from 'src/app/shared/services/brands/brand.service';
import { BrandFormBuilderService } from 'src/app/shared/services/brands/brand-form-builder.service';
import { Brand } from 'src/app/shared/models/brand-interface';
import { CardBrandComponent } from './card-brand.component';

describe('CardBrandComponent', () => {
  let component: CardBrandComponent;
  let fixture: ComponentFixture<CardBrandComponent>;
  let validationService: ValidationService;
  let brandService: BrandService;
  let alertMessageService: AlertMessageService;
  let brandFormBuilder: BrandFormBuilderService;

  beforeEach(() => {
    const mockBrandService = {
      fetchBrandData: jest.fn()
    };

    const mockValidationService = {
      markFormGroupTouched: jest.fn()
    };

    const mockAlertMessageService = {
      showSuccess: jest.fn(),
      showError: jest.fn()
    };

    const mockBrandFormBuilderService = {
      initBrandForm: jest.fn(() => new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
      }))
    };

    TestBed.configureTestingModule({
      declarations: [CardBrandComponent],
      providers: [
        { provide: BrandService, useValue: mockBrandService },
        { provide: ValidationService, useValue: mockValidationService },
        { provide: AlertMessageService, useValue: mockAlertMessageService },
        { provide: BrandFormBuilderService, useValue: mockBrandFormBuilderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardBrandComponent);
    component = fixture.componentInstance;
    validationService = TestBed.inject(ValidationService);
    brandService = TestBed.inject(BrandService);
    alertMessageService = TestBed.inject(AlertMessageService);
    brandFormBuilder = TestBed.inject(BrandFormBuilderService);

    fixture.detectChanges();
  });


  it('should call BrandService.fetchBrandData and alertService.showSuccess when form is valid', () => {
    const mockBrand: Brand = {
      name: 'Test Brand',
      description: 'Test Description'
    };

    const fetchBrandDataSpy = jest.spyOn(brandService, 'fetchBrandData').mockReturnValue(of(mockBrand));
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess');

    // Set form values to valid data
    component.brandForm.controls['name'].setValue('Test Brand');
    component.brandForm.controls['description'].setValue('Test Description');
    component.getData();

    expect(fetchBrandDataSpy).toHaveBeenCalledWith(mockBrand);
    expect(showSuccessSpy).toHaveBeenCalledWith('Formulario enviado exitosamente');
  });

  it('should call alertService.showError when BrandService.fetchBrandData fails', () => {
    const mockError = { error: { message: 'Test Error' } };
    const fetchBrandDataSpy = jest.spyOn(brandService, 'fetchBrandData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError');

    component.brandForm.controls['name'].setValue('Test Brand');
    component.brandForm.controls['description'].setValue('Test Description');
    component.getData();

    expect(fetchBrandDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Test Error');
  });
});
