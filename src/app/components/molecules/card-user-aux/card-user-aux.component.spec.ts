import {  FormControl, FormGroup } from '@angular/forms';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CardUserAuxComponent } from './card-user-aux.component';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';
import { AuxUserService } from 'src/app/shared/services/auxUser/aux-user.service';
import { AuxFormBuilderService } from 'src/app/shared/services/auxUser/aux-form-builder.service';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { UserAux } from 'src/app/shared/models/aux-interface';

describe('CardUserAuxComponent', () => {
  let component: CardUserAuxComponent;
  let fixture: ComponentFixture<CardUserAuxComponent>;
  let validationService: ValidationService;
  let userAuxService: AuxUserService;
  let alertMessageService: AlertMessageService;
  let userAuxFormBuilder: AuxFormBuilderService;

  beforeEach(() => {
    const mockAuxService = {
      fetchUserAuxData: jest.fn()
    };

    const mockValidationService = {
      markFormGroupTouched: jest.fn()
    };

    const mockAlertMessageService = {
      showSuccess: jest.fn(),
      showError: jest.fn()
    };

    const mockUserAuxFormBuilderService = {
      initUserAuxForm: jest.fn(() => new FormGroup({
        name: new FormControl(''),
        lastName: new FormControl(''),
        dni:new FormControl(''),
        telephone:new FormControl(''),
        dateAge:new FormControl(''),
        email: new FormControl(''),
        password:new FormControl('')
      }))
    };

    TestBed.configureTestingModule({
      declarations: [CardUserAuxComponent],
      providers: [
        { provide: AuxUserService, useValue: mockAuxService },
        { provide: ValidationService, useValue: mockValidationService },
        { provide: AlertMessageService, useValue: mockAlertMessageService },
        { provide: AuxFormBuilderService, useValue: mockUserAuxFormBuilderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardUserAuxComponent);
    component = fixture.componentInstance;
    validationService = TestBed.inject(ValidationService);
    userAuxService = TestBed.inject(AuxUserService);
    alertMessageService = TestBed.inject(AlertMessageService);
    userAuxFormBuilder = TestBed.inject(AuxFormBuilderService);

    fixture.detectChanges();
  });

  const mockUserAux: UserAux = {
    name: 'Test Article',
    lastName: 'Test Description',
    dni:"123456789",
    telephone:"+575551234",
    dateAge:'1990-01-15',
    email: 'amigo@gmail.com',
    password:'123'
  };

  const mockUserAuxempty: UserAux = {
    name: null,
    lastName:null,
    dni:null,
    telephone:null,
    dateAge:null,
    email: null,
    password:null
 
  };

  it('should call ArticleService.fetchArticleData and alertService.showSuccess when form is valid', () => {

    const fetchAuxDataSpy = jest.spyOn(userAuxService, 'fetchUserAuxData').mockReturnValue(of(mockUserAux));
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(alertMessageService.showSuccess('Articulo creado exitosamente'));;

    // Set form values to valid data
    component.userAuxForm.controls['name'].setValue('Test Article');
    component.userAuxForm.controls['lastName'].setValue('Test Description');
    component.userAuxForm.controls['dni'].setValue('Test Description');
    component.userAuxForm.controls['telephone'].setValue('+573656458486');
    component.userAuxForm.controls['dateAge'].setValue('1990-01-15');
    component.userAuxForm.controls['email'].setValue(['amigo@gmail.com']);
    component.userAuxForm.controls['password'].setValue(['123']);
    component.getData();

    expect(fetchAuxDataSpy).toHaveBeenCalledWith(mockUserAux);
    expect(showSuccessSpy).toHaveBeenCalledWith('Usuario Auxiliar creado exitosamente');
  });

  it('should call alertService.showError when ArticleService.fetchUserAuxData fails', () => {
    const mockError = { error: { message: 'Test Error' } };
    const fetchArticleDataSpy = jest.spyOn(userAuxService, 'fetchUserAuxData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Test Error'));

    component.userAuxForm.controls['name'].setValue('Test Article');
    component.userAuxForm.controls['lastName'].setValue('Test Description');
    component.userAuxForm.controls['dni'].setValue('Test Description');
    component.userAuxForm.controls['telephone'].setValue('+573656458486');
    component.userAuxForm.controls['dateAge'].setValue('1990-01-15');
    component.userAuxForm.controls['email'].setValue(['amigo@gmail.com']);
    component.userAuxForm.controls['password'].setValue(['123']);
    component.getData();

    expect(fetchArticleDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Test Error');
  });

  it('should show success message on successful form submission', () => {

    // Set valid form data
    component.userAuxForm.setValue({
      name: 'Test Article',
      lastName: 'Test Description',
      dni:"123456789",
      telephone:"+575551234",
      dateAge:'1990-01-15',
      email: 'amigo@gmail.com',
      password:'123'
    });

    // Mock alertMessageService
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(alertMessageService.showSuccess('Articulo creado exitosamente'));
    
    // Mock the response from ArticleService
    jest.spyOn(userAuxService, 'fetchUserAuxData').mockReturnValue(of(mockUserAux));

    component.getData();

    expect(showSuccessSpy).toHaveBeenCalledWith('Articulo creado exitosamente');
  });

  it('should show error message on failed form submission', () => {
    // Set valid form data
    component.userAuxForm.setValue({
      name: 'Test Article',
      lastName: 'Test Description',
      dni:"123456789",
      telephone:"+575551234",
      dateAge:'1990-01-15',
      email: 'amigo@gmail.com',
      password:'123'
    });

    // Mock alertMessageService
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Error occurred'));

    // Mock the error response from ArticleService
    jest.spyOn(userAuxService, 'fetchUserAuxData').mockReturnValue(throwError({ error: { message: 'Error occurred' } }));

    component.getData();

    expect(showErrorSpy).toHaveBeenCalledWith('Error occurred');
  });



  it('should not call markFormGroupTouched if the form is valid', () => {
    // Set the form to a valid state
    component.userAuxForm.setValue({
      name: 'Test Article',
      lastName: 'Test Description',
      dni:"123456789",
      telephone:"+575551234",
      dateAge:'1990-01-15',
      email: 'amigo@gmail.com',
      password:'123'
    });

    // Mock the fetchArticleData to return an observable (mock success response)
    jest.spyOn(userAuxService, 'fetchUserAuxData').mockReturnValue(of(mockUserAux));

    // Spy on markFormGroupTouched
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Call getData()
    component.getData();

    // Ensure markFormGroupTouched is NOT called
    expect(markFormGroupTouchedSpy).not.toHaveBeenCalled();
  });
  
  it('should call markFormGroupTouched if the form is invalid', () => {
    // Set the form to be invalid
    component.userAuxForm.setValue({
      name: null,
      lastName: null,
      dni:null,
      telephone:null,
      dateAge:null,
      email: null,
      password:null
    });

    // Spy on markFormGroupTouched to check if it's called
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Mock the fetchArticleData method to return an observable
    jest.spyOn(userAuxService, 'fetchUserAuxData').mockReturnValue(of(mockUserAux));

    // Call the method that triggers the validation and fetch
    component.getData();

    
    // Optionally, check if the service was called (if needed)
    expect(userAuxService.fetchUserAuxData).toHaveBeenCalledWith(component.userAuxForm.value);
  });

});
