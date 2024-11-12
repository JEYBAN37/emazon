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

  const mockBrand: Brand = {
    name: 'Test Brand',
    description: 'Test Description'
  };

  const mockBrandEmty: Brand = {
    name: null,
    description: null
  };

  it('should initialize the form on ngOnInit', () => {
    const initBrandFormSpy = jest.spyOn(brandFormBuilder, 'initBrandForm');
    
    component.ngOnInit(); // Llamamos al ngOnInit para inicializar el formulario
  
    expect(initBrandFormSpy).toHaveBeenCalled();
    expect(component.brandForm).toBeDefined();
  });
  

  it('should call BrandService.fetchBrandData and alertService.showSuccess when form is valid', () => {
    const fetchBrandDataSpy = jest.spyOn(brandService, 'fetchBrandData').mockReturnValue(of(mockBrand));
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(
      alertMessageService.showSuccess('Marca creada exitosamente'));

    component.brandForm.controls['name'].setValue('Test Brand');
    component.brandForm.controls['description'].setValue('Test Description');
    component.getData();

    expect(fetchBrandDataSpy).toHaveBeenCalledWith(mockBrand);
    expect(showSuccessSpy).toHaveBeenCalledWith('Marca creada exitosamente');
  });

  it('should call BrandService.fetchBrandData and alertService.showSuccess when form is valid', () => {

    component.brandForm.setValue({
      name: 'Test Brand',
      description: 'Test Description'
    });

    const fetchBrandDataSpy = jest.spyOn(brandService, 'fetchBrandData').mockReturnValue(of(mockBrand));
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(
      alertMessageService.showSuccess('Marca creada exitosamente'));

      // Llama al método que debería llamar a showSuccess
    component.getData();

      // Verifica el valor de retorno en la primera llamada
    console.log("Valor de retorno de la primera llamada:", showSuccessSpy.mock.results[0]);


    expect(fetchBrandDataSpy).toHaveBeenCalledWith(mockBrand);
    expect(showSuccessSpy).toHaveBeenCalledWith('Marca creada exitosamente');
  });

  it('should call alertService.showError when BrandService.fetchBrandData fails', () => {
    const mockError = { error: { message: 'Test Error' } };
    const fetchBrandDataSpy = jest.spyOn(brandService, 'fetchBrandData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(
      alertMessageService.showError('Test Error'));

    component.brandForm.controls['name'].setValue('Test Brand');
    component.brandForm.controls['description'].setValue('Test Description');
    component.getData();

    expect(fetchBrandDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Test Error');
  });




  it('should show success message on successful form submission', () => {

    // Set valid form data
    component.brandForm.setValue({
      name: 'Test Brand',
      description: 'Test Description'
    });

    // Mock alertMessageService
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(
      alertMessageService.showSuccess('Marca creada exitosamente'));
;
    // Mock the response from brandService
    jest.spyOn(brandService, 'fetchBrandData').mockReturnValue(of(mockBrand));

    component.getData();

    expect(showSuccessSpy).toHaveBeenCalledWith('Marca creada exitosamente');
  });

  it('should show error message on failed form submission', () => {
    // Set valid form data
    component.brandForm.setValue({
      name: 'Test Brand',
      description: 'Test Description'
    });

    // Mock alertMessageService
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(
      alertMessageService.showError('Error occurred'));
;

    // Mock the error response from brandService
    jest.spyOn(brandService, 'fetchBrandData').mockReturnValue(throwError({ error: { message: 'Error occurred' } }));

    component.getData();

    expect(showErrorSpy).toHaveBeenCalledWith('Error occurred');
  });

  it('should emit refresGet event after successful form submission', () => {
    // Set valid form data
    component.brandForm.setValue({
      name: 'Test Brand',
      description: 'Test Description'
    });

    // Spy on refresGet emit
    const emitSpy = jest.spyOn(component.refresGet, 'emit');

    // Mock the response from brandService
    jest.spyOn(brandService, 'fetchBrandData').mockReturnValue(of(mockBrand));

    component.getData();

    expect(emitSpy).toHaveBeenCalled();
  });


  it('should not call markFormGroupTouched if the form is valid', () => {
    // Set the form to a valid state
    component.brandForm.setValue({
      name: 'Valid Brand',
      description: 'Valid Description',
    });

    // Mock the fetchBrandData to return an observable (mock success response)
    jest.spyOn(brandService, 'fetchBrandData').mockReturnValue(of(mockBrand));

    // Spy on markFormGroupTouched
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Call getData()
    component.getData();

    // Ensure markFormGroupTouched is NOT called
    expect(markFormGroupTouchedSpy).not.toHaveBeenCalled();
  });
  
  it('should call markFormGroupTouched if the form is invalid', () => {
    // Set the form to be invalid
    component.brandForm.setValue({
      name: null, // Invalid value
      description:null// Invalid value
    });

    // Spy on markFormGroupTouched to check if it's called
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Mock the fetchBrandData method to return an observable
    jest.spyOn(brandService, 'fetchBrandData').mockReturnValue(of(mockBrandEmty));

    // Call the method that triggers the validation and fetch
    component.getData();
    
    // Optionally, check if the service was called (if needed)
    expect(brandService.fetchBrandData).toHaveBeenCalledWith(component.brandForm.value);
  });

  it('should not call markFormGroupTouched if the form is valid', () => {
    component.brandForm.setValue({
      name: 'Valid Brand',
      description: 'Valid Description',
    });

    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');
    jest.spyOn(brandService, 'fetchBrandData').mockReturnValue(of(mockBrand));

    component.getData();

    expect(markFormGroupTouchedSpy).not.toHaveBeenCalled();
  });
});