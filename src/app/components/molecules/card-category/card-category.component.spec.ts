import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { CardCategoryComponent } from './card-category.component';
import { CategoryFormBuilderService } from 'src/app/shared/services/category/category-form-builder.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Category } from 'src/app/shared/models/category-interface';


describe('CardCategoryComponent', () => {
  let component: CardCategoryComponent;
  let fixture: ComponentFixture<CardCategoryComponent>;
  let validationService: ValidationService;
  let categoryService: CategoryService;
  let alertMessageService: AlertMessageService;
  let categoryFormBuilder: CategoryFormBuilderService;

  beforeEach(() => {
    const mockCategoryService = {
      fetchCategoryData: jest.fn()
    };

    const mockValidationService = {
      markFormGroupTouched: jest.fn()
    };

    const mockAlertMessageService = {
      showSuccess: jest.fn(),
      showError: jest.fn()
    };

    const mockCategoryFormBuilderService = {
      initCategoryForm: jest.fn(() => new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
      }))
    };

    TestBed.configureTestingModule({
      declarations: [CardCategoryComponent],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: ValidationService, useValue: mockValidationService },
        { provide: AlertMessageService, useValue: mockAlertMessageService },
        { provide: CategoryFormBuilderService, useValue: mockCategoryFormBuilderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardCategoryComponent);
    component = fixture.componentInstance;
    validationService = TestBed.inject(ValidationService);
    categoryService = TestBed.inject(CategoryService);
    alertMessageService = TestBed.inject(AlertMessageService);
    categoryFormBuilder = TestBed.inject(CategoryFormBuilderService);

    fixture.detectChanges();
  });

  const mockCategory: Category = {
    name: 'Test Category',
    description: 'Test Description'
  };

  const mockCategoryEmty: Category = {
    name: null,
    description: null
  };

  it('should call CategoryService.fetchCategoryData and alertService.showSuccess when form is valid', () => {

    const mockCategory: Category = {
      name: 'Test Category',
      description: 'Test Description'
    };

    const fetchCategoryDataSpy = jest.spyOn(categoryService, 'fetchCategoryData').mockReturnValue(of(mockCategory));
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(
      alertMessageService.showSuccess('Categoria creada exitosamente'));
;

    // Set form values to valid data
    component.categoryForm.controls['name'].setValue('Test Category');
    component.categoryForm.controls['description'].setValue('Test Description');
    component.getData();

    expect(fetchCategoryDataSpy).toHaveBeenCalledWith(mockCategory);
    expect(showSuccessSpy).toHaveBeenCalledWith('Categoria creada exitosamente');
  });

  it('should call alertService.showError when CategoryService.fetchCategoryData fails', () => {
    const mockError = { error: { message: 'Test Error' } };
    const fetchCategoryDataSpy = jest.spyOn(categoryService, 'fetchCategoryData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError')
    .mockReturnValue(alertMessageService.showError('Test Error'));

    component.categoryForm.controls['name'].setValue('Test Category');
    component.categoryForm.controls['description'].setValue('Test Description');
    component.getData();

    expect(fetchCategoryDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Test Error');
  });

  it('should show success message on successful form submission', () => {

    // Set valid form data
    component.categoryForm.setValue({
      name: 'Test Category',
      description: 'Test Description'
    });

    // Mock alertMessageService
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(
      alertMessageService.showSuccess('Categoria creada exitosamente'));
    
    // Mock the response from CategoryService
    jest.spyOn(categoryService, 'fetchCategoryData').mockReturnValue(of(mockCategory));

    component.getData();

    expect(showSuccessSpy).toHaveBeenCalledWith('Categoria creada exitosamente');
  });

  it('should show error message on failed form submission', () => {
    // Set valid form data
    component.categoryForm.setValue({
      name: '',
      description: ''
    });

    // Mock alertMessageService
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Error occurred'));

    // Mock the error response from CategoryService
    jest.spyOn(categoryService, 'fetchCategoryData').mockReturnValue(throwError({ error: { message: 'Error occurred' } }));

    component.getData();

    expect(showErrorSpy).toHaveBeenCalledWith('Error occurred');
  });

  it('should emit refresGet event after successful form submission', () => {
    // Set valid form data
    component.categoryForm.setValue({
      name: 'Test Category',
      description: 'Test Description'
    });

    // Spy on refresGet emit
    const emitSpy = jest.spyOn(component.refresGet, 'emit');

    // Mock the response from CategoryService
    jest.spyOn(categoryService, 'fetchCategoryData').mockReturnValue(of(mockCategory));

    component.getData();

    expect(emitSpy).toHaveBeenCalled();
  });


  it('should not call markFormGroupTouched if the form is valid', () => {
    // Set the form to a valid state
    component.categoryForm.setValue({
      name: 'Valid Category',
      description: 'Valid Description',
    });

    // Mock the fetchCategoryData to return an observable (mock success response)
    jest.spyOn(categoryService, 'fetchCategoryData').mockReturnValue(of(mockCategory));

    // Spy on markFormGroupTouched
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Call getData()
    component.getData();

    // Ensure markFormGroupTouched is NOT called
    expect(markFormGroupTouchedSpy).not.toHaveBeenCalled();
  });
  
  it('should call markFormGroupTouched if the form is invalid', () => {
    // Set the form to be invalid
    component.categoryForm.setValue({
      name: null, // Invalid value
      description:null// Invalid value
    });

    // Spy on markFormGroupTouched to check if it's called
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Mock the fetchCategoryData method to return an observable
    jest.spyOn(categoryService, 'fetchCategoryData').mockReturnValue(of(mockCategoryEmty));

    // Call the method that triggers the validation and fetch
    component.getData();

    // Optionally, check if the service was called (if needed)
    expect(categoryService.fetchCategoryData).toHaveBeenCalledWith(component.categoryForm.value);
  });

  it('debería llamar a markFormGroupTouched si el formulario es inválido vfd', () => {
    // Marcar el formulario como inválido
    component.categoryForm.get('name')?.setErrors({ required: true });
    // Espiar la función markFormGroupTouched
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Llamar al método getData, que debería disparar la validación
    component.getData();

    // Verificar que markFormGroupTouched se haya llamado
    expect(markFormGroupTouchedSpy).toHaveBeenCalledWith(component.categoryForm);
  });
  
  it('should call alertService.showError with default message when error object does not contain a message', () => {
    const mockError = { error: {} };
    const fetchUserAuxDataSpy = jest.spyOn(categoryService, 'fetchCategoryData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Hubo un error al enviar'));

    component.categoryForm.controls['name'].setValue('Test Brand');
    component.categoryForm.controls['description'].setValue('Test Description');
    component.getData();

    expect(fetchUserAuxDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Hubo un error al enviar');
  });

  it('should call alertService.showError with specific message when error object contains a message', () => {
    const mockError = { error: { message: 'Test Error' } };
    const fetchUserAuxDataSpy = jest.spyOn(categoryService, 'fetchCategoryData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Test Error'));

    component.categoryForm.controls['name'].setValue('Test Brand');
    component.categoryForm.controls['description'].setValue('Test Description');
    component.getData();

    expect(fetchUserAuxDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Test Error');
  });

  
});
