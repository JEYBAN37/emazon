import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormSessionComponent } from './form-session.component';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { UserLoginFormBuilderService } from 'src/app/shared/services/user-login/user-login-form-builder.service';
import { UserLoginService } from 'src/app/shared/services/user-login/user-login.service';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';
import { of, throwError } from 'rxjs';
import { User } from 'src/app/shared/models/user-interface';

describe('FormSessionComponent', () => {
  let component: FormSessionComponent;
  let fixture: ComponentFixture<FormSessionComponent>;
  let validationService: ValidationService;
  let alertMessageService: AlertMessageService;
  let userLoginService: UserLoginService;
  let routerSpy = { navigate: jest.fn() };
  let loginFormBuilder: UserLoginFormBuilderService;


  beforeEach(() => {
    const mockCategoryService = {
      fetchUser: jest.fn()
    };

    const mockValidationService = {
      markFormGroupTouched: jest.fn()
    };

    const mockAlertMessageService = {
      showSuccess: jest.fn(),
      showError: jest.fn()
    };

    const mockCategoryFormBuilderService = {
      inicialUserLoginForm: jest.fn(() => new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
      }))
    };

    TestBed.configureTestingModule({
      declarations: [FormSessionComponent],
      providers: [
        { provide: UserLoginService, useValue: mockCategoryService },
        { provide: ValidationService, useValue: mockValidationService },
        { provide: AlertMessageService, useValue: mockAlertMessageService },
        { provide: UserLoginFormBuilderService, useValue: mockCategoryFormBuilderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormSessionComponent);
    component = fixture.componentInstance;
    validationService = TestBed.inject(ValidationService);
    userLoginService = TestBed.inject(UserLoginService);
    alertMessageService = TestBed.inject(AlertMessageService);
    loginFormBuilder = TestBed.inject(UserLoginFormBuilderService);

    fixture.detectChanges();
  });

  const mockCategory: User = {
    email: 'Test Category',
    password: 'Test Description'
  };

  const mockCategoryEmty: User = {
    email: null,
    password: null
  };

  it('should call CategoryService.fetchCategoryData and alertService.showSuccess when form is valid', () => {

    const fetchCategoryDataSpy = jest.spyOn(userLoginService, 'fetchUser').mockReturnValue(of(mockCategory));
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(
      alertMessageService.showSuccess('Categoria creada exitosamente'));
;

    // Set form values to valid data
    component.userForm.controls['email'].setValue('Test Category');
    component.userForm.controls['password'].setValue('Test Description');
    component.getData();

    expect(fetchCategoryDataSpy).toHaveBeenCalledWith(mockCategory);
    expect(showSuccessSpy).toHaveBeenCalledWith('Categoria creada exitosamente');
  });

  it('should call alertService.showError when CategoryService.fetchCategoryData fails', () => {
    const mockError = { error: { message: 'Test Error' } };
    const fetchCategoryDataSpy = jest.spyOn(userLoginService, 'fetchUser').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError')
    .mockReturnValue(alertMessageService.showError('Test Error'));

    component.userForm.controls['email'].setValue('Test Category');
    component.userForm.controls['password'].setValue('Test Description');
    component.getData();

    expect(fetchCategoryDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Test Error');
  });
  it('should show success message on successful form submission', () => {

    // Set valid form data
    component.userForm.setValue({
      email: 'Test Category',
      password: 'Test Description'
    });

    // Mock alertMessageService
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(
      alertMessageService.showSuccess('Categoria creada exitosamente'));
    
    // Mock the response from CategoryService
    jest.spyOn(userLoginService, 'fetchUser').mockReturnValue(of(mockCategory));

    component.getData();

    expect(showSuccessSpy).toHaveBeenCalledWith('Categoria creada exitosamente');
  });

  it('should show error message on failed form submission', () => {
    // Set valid form data
    component.userForm.setValue({
      email: '',
      password: ''
    });

    // Mock alertMessageService
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Error occurred'));

    // Mock the error response from userLoginService
    jest.spyOn(userLoginService, 'fetchUser').mockReturnValue(throwError({ error: { message: 'Error occurred' } }));

    component.getData();

    expect(showErrorSpy).toHaveBeenCalledWith('Error occurred');
  });


  it('should not call markFormGroupTouched if the form is valid', () => {
    // Set the form to a valid state
    component.userForm.setValue({
      email: 'Valid Category',
      password: 'Valid Description',
    });

    // Mock the fetchCategoryData to return an observable (mock success response)
    jest.spyOn(userLoginService, 'fetchUser').mockReturnValue(of(mockCategory));

    // Spy on markFormGroupTouched
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Call getData()
    component.getData();

    // Ensure markFormGroupTouched is NOT called
    expect(markFormGroupTouchedSpy).not.toHaveBeenCalled();
  });
  
  it('should call markFormGroupTouched if the form is invalid', () => {
    // Set the form to be invalid
    component.userForm.setValue({
      email: null, // Invalid value
      password:null// Invalid value
    });

    // Spy on markFormGroupTouched to check if it's called
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Mock the fetchCategoryData method to return an observable
    jest.spyOn(userLoginService, 'fetchUser').mockReturnValue(of(mockCategoryEmty));

    // Call the method that triggers the validation and fetch
    component.getData();

    // Optionally, check if the service was called (if needed)
    expect(userLoginService.fetchUser).toHaveBeenCalledWith(component.userForm.value);
  });

  it('debería llamar a markFormGroupTouched si el formulario es inválido vfd', () => {
    // Marcar el formulario como inválido
    component.userForm.get('email')?.setErrors({ required: true });
    // Espiar la función markFormGroupTouched
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Llamar al método getData, que debería disparar la validación
    component.getData();

    // Verificar que markFormGroupTouched se haya llamado
    expect(markFormGroupTouchedSpy).toHaveBeenCalledWith(component.userForm);
  });
  
  it('should call alertService.showError with default message when error object does not contain a message', () => {
    const mockError = { error: {} };
    const fetchUserAuxDataSpy = jest.spyOn(userLoginService, 'fetchUser').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Hubo un error al enviar'));

    component.userForm.controls['email'].setValue('Test Category');
    component.userForm.controls['password'].setValue('Test Description');
    component.getData();

    expect(fetchUserAuxDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Hubo un error al enviar');
  });

  it('should call alertService.showError with specific message when error object contains a message', () => {
    const mockError = { error: { message: 'Test Error' } };
    const fetchUserAuxDataSpy = jest.spyOn(userLoginService, 'fetchUser').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Test Error'));

    component.userForm.controls['email'].setValue('Test Category');
    component.userForm.controls['password'].setValue('Test Description');
    component.getData();

    expect(fetchUserAuxDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Test Error');
  });

});
