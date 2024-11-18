import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PanelRegisterComponent } from "./panel-register.component";
import { ValidationService } from "src/app/shared/services/validations/validation.service";
import { UserRegisterService } from "src/app/shared/services/user/user-register.service";
import { AlertMessageService } from "src/app/shared/services/alerts-services/alert-message.service";
import { UserRegisterFormBuilderService } from "src/app/shared/services/user/user-register-form-builder.service";
import { FormControl, FormGroup } from "@angular/forms";
import { UserAux } from "src/app/shared/models/aux-interface";
import { of, throwError } from "rxjs";
import { Router } from '@angular/router';


describe('PanelRegisterComponent', () => {
  let component: PanelRegisterComponent;
  let fixture: ComponentFixture<PanelRegisterComponent>;
  let validationService: ValidationService;
  let userRegisterService: UserRegisterService;
  let alertMessageService: AlertMessageService;
  let userFormBuilder: UserRegisterFormBuilderService;

  beforeEach(() => {
    const mockUserRegisterService = {
      fetchUserData: jest.fn()
    };

    const mockValidationService = {
      markFormGroupTouched: jest.fn()
    };

    const mockAlertMessageService = {
      showSuccess: jest.fn(),
      showError: jest.fn()
    };

    const mockUserRegisterFormBuilderService = {
      initUserForm: jest.fn(() => new FormGroup({
        name:  new FormControl(''),
        lastName: new FormControl(''),
        dni: new FormControl(''),
        telephone:  new FormControl(''),
        dateAge:  new FormControl(''),
        email: new FormControl(''),
        password: new FormControl('')
      }))
    };

    TestBed.configureTestingModule({
      declarations: [PanelRegisterComponent],
      providers: [
        { provide: UserRegisterService, useValue: mockUserRegisterService },
        { provide: ValidationService, useValue: mockValidationService },
        { provide: AlertMessageService, useValue: mockAlertMessageService },
        { provide: UserRegisterFormBuilderService, useValue: mockUserRegisterFormBuilderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PanelRegisterComponent);
    component = fixture.componentInstance;
    validationService = TestBed.inject(ValidationService);
    userRegisterService = TestBed.inject(UserRegisterService);
    alertMessageService = TestBed.inject(AlertMessageService);
    userFormBuilder = TestBed.inject(UserRegisterFormBuilderService);

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


  it('should initialize the form on ngOnInit', () => {
    const userRegisterFormSpy = jest.spyOn(userFormBuilder, 'initUserForm');
    
    component.ngOnInit(); // Llamamos al ngOnInit para inicializar el formulario
  
    expect(userRegisterFormSpy).toHaveBeenCalled();
    expect(component.userRegisterForm).toBeDefined();
  });

  it('should call BrandService.fetchBrandData and alertService.showSuccess when form is valid', () => {
    const fetchBrandDataSpy = jest.spyOn(userRegisterService, 'fetchUserData').mockReturnValue(of(mockUserAux));
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(
      alertMessageService.showSuccess('Usuario Cliente creado exitosamente'));

    component.userRegisterForm.controls['name'].setValue('Test Article');
    component.userRegisterForm.controls['lastName'].setValue('Test Description');
    component.userRegisterForm.controls['dni'].setValue('44765465');
    component.userRegisterForm.controls['telephone'].setValue('+573656458486');
    component.userRegisterForm.controls['dateAge'].setValue('1990-01-15');
    component.userRegisterForm.controls['email'].setValue('amigo@gmail.com');
    component.userRegisterForm.controls['password'].setValue('123');
    component.getData();

    expect(fetchBrandDataSpy).toHaveBeenCalledWith(mockUserAux);
    expect(showSuccessSpy).toHaveBeenCalledWith('Usuario Cliente creado exitosamente');
  });

  it('should call AuxService.fetchArticleData and alertService.showSuccess when form is invalid', () => {

    const fetchAuxDataSpy = jest.spyOn(userRegisterService, 'fetchUserData').mockReturnValue(of(mockUserAux));
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');
    // Set form values to valid data
    component.userRegisterForm.controls['name'].setValue('Test Article');
    component.userRegisterForm.controls['lastName'].setValue('Test Description');
    component.userRegisterForm.controls['dni'].setValue('44765465');
    component.userRegisterForm.controls['telephone'].setValue('+573656458486');
    component.userRegisterForm.controls['dateAge'].setValue(7);
    component.userRegisterForm.controls['email'].setValue('amigo@gmail.com');
    component.userRegisterForm.controls['password'].setValue('123');
    component.getData();

  
    expect(markFormGroupTouchedSpy).not.toHaveBeenCalled();
  });

  it('should call alertService.showError when ArticleService.fetchArticleData fails', () => {
    const mockError = { error: { message: 'Test Error' } };
    const fetchArticleDataSpy = jest.spyOn(userRegisterService, 'fetchUserData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Test Error'));

    component.userRegisterForm.controls['name'].setValue('Test Article');
    component.userRegisterForm.controls['lastName'].setValue('Test Description');
    component.userRegisterForm.controls['dni'].setValue('44765465');
    component.userRegisterForm.controls['telephone'].setValue('+573656458486');
    component.userRegisterForm.controls['dateAge'].setValue(7);
    component.userRegisterForm.controls['email'].setValue('amigo@gmail.com');
    component.userRegisterForm.controls['password'].setValue('123');
    component.getData();

    expect(fetchArticleDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Test Error');
  });

  it('should show success message on successful form submission', () => {

    // Set valid form data
    component.userRegisterForm.controls['name'].setValue('Test Article');
    component.userRegisterForm.controls['lastName'].setValue('Test Description');
    component.userRegisterForm.controls['dni'].setValue('44765465');
    component.userRegisterForm.controls['telephone'].setValue('+573656458486');
    component.userRegisterForm.controls['dateAge'].setValue('1990-01-15');
    component.userRegisterForm.controls['email'].setValue('amigo@gmail.com');
    component.userRegisterForm.controls['password'].setValue('123');


    // Mock alertMessageService
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(alertMessageService.showSuccess('Usuario Cliente creado exitosamente'));
    
    // Mock the response from ArticleService
    jest.spyOn(userRegisterService, 'fetchUserData').mockReturnValue(of(mockUserAux));

    component.getData();

    expect(showSuccessSpy).toHaveBeenCalledWith('Usuario Cliente creado exitosamente');
  });


  it('debería llamar a markFormGroupTouched si el formulario es inválido', () => {
    // Establecer el formulario como inválido
    component.userRegisterForm.controls['name'].setValue(null);
    component.userRegisterForm.controls['lastName'].setValue(null);
    component.userRegisterForm.controls['dni'].setValue(null);
    component.userRegisterForm.controls['telephone'].setValue(null);
    component.userRegisterForm.controls['dateAge'].setValue(null);
    component.userRegisterForm.controls['email'].setValue(null);
    component.userRegisterForm.controls['password'].setValue(null);

    // Espiar la función markFormGroupTouched para verificar si se llama
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Mockear el método fetchArticleData para que retorne un observable (simular respuesta)
    jest.spyOn(userRegisterService, 'fetchUserData').mockReturnValue(of({})); // Retorna un observable vacío


    // Llamar al método getData, que debería disparar la validación
    component.getData();
    validationService.markFormGroupTouched(component.userRegisterForm);


    // Verificar que markFormGroupTouched se haya llamado cuando el formulario es inválido
    expect(markFormGroupTouchedSpy).toHaveBeenCalled();
  });

  it('debería llamar a markFormGroupTouched si el formulario es inválido vfd', () => {
    // Marcar el formulario como inválido
    component.userRegisterForm.get('name')?.setErrors({ required: true });
    // Espiar la función markFormGroupTouched
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Llamar al método getData, que debería disparar la validación
    component.getData();

    // Verificar que markFormGroupTouched se haya llamado
    expect(markFormGroupTouchedSpy).toHaveBeenCalledWith(component.userRegisterForm);
  });

  it('should call alertService.showError with default message when error object does not contain a message', () => {
    const mockError = { error: {} };
    const fetchUserAuxDataSpy = jest.spyOn(userRegisterService, 'fetchUserData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Hubo un error al enviar'));

    component.userRegisterForm.controls['name'].setValue('Test Article');
    component.userRegisterForm.controls['lastName'].setValue('Test Description');
    component.userRegisterForm.controls['dni'].setValue('44765465');
    component.userRegisterForm.controls['telephone'].setValue('+573656458486');
    component.userRegisterForm.controls['dateAge'].setValue('1990-01-15');
    component.userRegisterForm.controls['email'].setValue('amigo@gmail.com');
    component.userRegisterForm.controls['password'].setValue('123');
    component.getData();

    expect(fetchUserAuxDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Hubo un error al enviar');
  });

  it('should call alertService.showError with specific message when error object contains a message', () => {
    const mockError = { error: { message: 'Test Error' } };
    const fetchUserAuxDataSpy = jest.spyOn(userRegisterService, 'fetchUserData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Test Error'));

    component.userRegisterForm.controls['name'].setValue('Test Article');
    component.userRegisterForm.controls['lastName'].setValue('Test Description');
    component.userRegisterForm.controls['dni'].setValue('44765465');
    component.userRegisterForm.controls['telephone'].setValue('+573656458486');
    component.userRegisterForm.controls['dateAge'].setValue('1990-01-15');
    component.userRegisterForm.controls['email'].setValue('amigo@gmail.com');
    component.userRegisterForm.controls['password'].setValue('123');
    component.getData();

    expect(fetchUserAuxDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Test Error');
  });
describe('PanelRegisterComponent', () => {
  // Existing setup code...

  let router: Router;

  beforeEach(() => {
    // Existing setup code...

    router = TestBed.inject(Router);
  });

  // Existing tests...

  it('should navigate to login page when toLogin is called', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.toLogin();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
});


