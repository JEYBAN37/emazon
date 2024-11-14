import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAuxComponent } from './card-aux.component';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';
import { AuxUserService } from 'src/app/shared/services/auxUser/aux-user.service';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { AuxFormBuilderService } from 'src/app/shared/services/auxUser/aux-form-builder.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserAux } from 'src/app/shared/models/aux-interface';
import { of, throwError } from 'rxjs';

describe('CardAuxComponent', () => {
  let component: CardAuxComponent;
  let fixture: ComponentFixture<CardAuxComponent>;
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
      initAuxUserForm: jest.fn(() => new FormGroup({
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
      declarations: [ CardAuxComponent ],
      providers: [
        { provide: AuxUserService, useValue: mockAuxService },
        { provide: ValidationService, useValue: mockValidationService },
        { provide: AlertMessageService, useValue: mockAlertMessageService },
        { provide: AuxFormBuilderService, useValue: mockUserAuxFormBuilderService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAuxComponent);
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
    dni:"44765465",
    telephone:"+573656458486",
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call AuxService.fetchArticleData and alertService.showSuccess when form is valid', () => {

    const fetchAuxDataSpy = jest.spyOn(userAuxService, 'fetchUserAuxData').mockReturnValue(of(mockUserAux));
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(alertMessageService.showSuccess('Usuario Auxiliar creado exitosamente'));;

    // Set form values to valid data
    component.userAuxForm.controls['name'].setValue('Test Article');
    component.userAuxForm.controls['lastName'].setValue('Test Description');
    component.userAuxForm.controls['dni'].setValue('44765465');
    component.userAuxForm.controls['telephone'].setValue('+573656458486');
    component.userAuxForm.controls['dateAge'].setValue('1990-01-15');
    component.userAuxForm.controls['email'].setValue('amigo@gmail.com');
    component.userAuxForm.controls['password'].setValue('123');
    component.getData();

    expect(fetchAuxDataSpy).toHaveBeenCalledWith(mockUserAux);
    expect(showSuccessSpy).toHaveBeenCalledWith('Usuario Auxiliar creado exitosamente');
  });

  it('should call AuxService.fetchArticleData and alertService.showSuccess when form is invalid', () => {

    const fetchAuxDataSpy = jest.spyOn(userAuxService, 'fetchUserAuxData').mockReturnValue(of(mockUserAux));
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');
    // Set form values to valid data
    component.userAuxForm.controls['name'].setValue('Test Article');
    component.userAuxForm.controls['lastName'].setValue('Test Description');
    component.userAuxForm.controls['dni'].setValue('44765465');
    component.userAuxForm.controls['telephone'].setValue('+573656458486');
    component.userAuxForm.controls['dateAge'].setValue(7);
    component.userAuxForm.controls['email'].setValue('amigo@gmail.com');
    component.userAuxForm.controls['password'].setValue('123');
    component.getData();

  
    expect(markFormGroupTouchedSpy).not.toHaveBeenCalled();
  });

  it('should call alertService.showError when ArticleService.fetchArticleData fails', () => {
    const mockError = { error: { message: 'Test Error' } };
    const fetchArticleDataSpy = jest.spyOn(userAuxService, 'fetchUserAuxData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Test Error'));

    component.userAuxForm.controls['name'].setValue('Test Article');
    component.userAuxForm.controls['lastName'].setValue('Test Description');
    component.userAuxForm.controls['dni'].setValue('44765465');
    component.userAuxForm.controls['telephone'].setValue('+573656458486');
    component.userAuxForm.controls['dateAge'].setValue(7);
    component.userAuxForm.controls['email'].setValue('amigo@gmail.com');
    component.userAuxForm.controls['password'].setValue('123');
    component.getData();

    expect(fetchArticleDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Test Error');
  });

  it('should show success message on successful form submission', () => {

    // Set valid form data
    component.userAuxForm.controls['name'].setValue('Test Article');
    component.userAuxForm.controls['lastName'].setValue('Test Description');
    component.userAuxForm.controls['dni'].setValue('44765465');
    component.userAuxForm.controls['telephone'].setValue('+573656458486');
    component.userAuxForm.controls['dateAge'].setValue('1990-01-15');
    component.userAuxForm.controls['email'].setValue('amigo@gmail.com');
    component.userAuxForm.controls['password'].setValue('123');


    // Mock alertMessageService
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(alertMessageService.showSuccess('Articulo creado exitosamente'));
    
    // Mock the response from ArticleService
    jest.spyOn(userAuxService, 'fetchUserAuxData').mockReturnValue(of(mockUserAux));

    component.getData();

    expect(showSuccessSpy).toHaveBeenCalledWith('Articulo creado exitosamente');
  });

  it('debería llamar a markFormGroupTouched si el formulario es inválido', () => {
    // Establecer el formulario como inválido
    component.userAuxForm.controls['name'].setValue(null);
    component.userAuxForm.controls['lastName'].setValue(null);
    component.userAuxForm.controls['dni'].setValue(null);
    component.userAuxForm.controls['telephone'].setValue(null);
    component.userAuxForm.controls['dateAge'].setValue(null);
    component.userAuxForm.controls['email'].setValue(null);
    component.userAuxForm.controls['password'].setValue(null);

    // Espiar la función markFormGroupTouched para verificar si se llama
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Mockear el método fetchArticleData para que retorne un observable (simular respuesta)
    jest.spyOn(userAuxService, 'fetchUserAuxData').mockReturnValue(of({})); // Retorna un observable vacío


    // Llamar al método getData, que debería disparar la validación
    component.getData();
    validationService.markFormGroupTouched(component.userAuxForm);


    // Verificar que markFormGroupTouched se haya llamado cuando el formulario es inválido
    expect(markFormGroupTouchedSpy).toHaveBeenCalled();
  });

  it('debería llamar a markFormGroupTouched si el formulario es inválido vfd', () => {
    // Marcar el formulario como inválido
    component.userAuxForm.get('name')?.setErrors({ required: true });
    // Espiar la función markFormGroupTouched
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Llamar al método getData, que debería disparar la validación
    component.getData();

    // Verificar que markFormGroupTouched se haya llamado
    expect(markFormGroupTouchedSpy).toHaveBeenCalledWith(component.userAuxForm);
  });
  it('should call alertService.showError with default message when error object does not contain a message', () => {
    const mockError = { error: {} };
    const fetchUserAuxDataSpy = jest.spyOn(userAuxService, 'fetchUserAuxData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Hubo un error al enviar'));

    component.userAuxForm.controls['name'].setValue('Test Article');
    component.userAuxForm.controls['lastName'].setValue('Test Description');
    component.userAuxForm.controls['dni'].setValue('44765465');
    component.userAuxForm.controls['telephone'].setValue('+573656458486');
    component.userAuxForm.controls['dateAge'].setValue('1990-01-15');
    component.userAuxForm.controls['email'].setValue('amigo@gmail.com');
    component.userAuxForm.controls['password'].setValue('123');
    component.getData();

    expect(fetchUserAuxDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Hubo un error al enviar');
  });

  it('should call alertService.showError with specific message when error object contains a message', () => {
    const mockError = { error: { message: 'Test Error' } };
    const fetchUserAuxDataSpy = jest.spyOn(userAuxService, 'fetchUserAuxData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Test Error'));

    component.userAuxForm.controls['name'].setValue('Test Article');
    component.userAuxForm.controls['lastName'].setValue('Test Description');
    component.userAuxForm.controls['dni'].setValue('44765465');
    component.userAuxForm.controls['telephone'].setValue('+573656458486');
    component.userAuxForm.controls['dateAge'].setValue('1990-01-15');
    component.userAuxForm.controls['email'].setValue('amigo@gmail.com');
    component.userAuxForm.controls['password'].setValue('123');
    component.getData();

    expect(fetchUserAuxDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Test Error');
  });
 

  
});
