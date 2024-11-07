import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OBJECT_SERVICE, ObjectServiceInterface, ObjectStock } from 'src/app/shared/services/stock-service-interface';
import { of, throwError } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { LoginFormComponent } from './login-form.component';
import { LoginService, Username } from 'src/app/shared/services/login-service';

describe('CardBrandComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let mockService: jest.Mocked<LoginService>;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(async () => {
    jest.useFakeTimers(); 
    mockService = {
      create: jest.fn(),
      get: jest.fn()
    } as unknown as jest.Mocked<LoginService>;
  
      await TestBed.configureTestingModule({
        declarations: [LoginFormComponent],
        providers: [
          FormBuilder,
          { provide: OBJECT_SERVICE, useValue: mockService },
          ChangeDetectorRef
        ],
        imports: [ReactiveFormsModule]
      }).compileComponents();
  
      fixture = TestBed.createComponent(LoginFormComponent);
      component = fixture.componentInstance;
      changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
      component.service= mockService;
      fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllTimers(); // Limpiar los temporizadores
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('initForm', () => {
    it('should initialize the form with default values', () => {
      component.ngOnInit();
      expect(component.loginForm.value).toEqual({
        email: '',
        password: ''
      });
    });
  });


  describe('send', () => {
    it('should mark all fields as touched if form is invalid', () => {
      const markAllAsTouchedSpy = jest.spyOn(component.loginForm, 'markAllAsTouched');
      component.loginForm.controls['email'].setValue(''); // email vacío (inválido)
      component.send();
      expect(markAllAsTouchedSpy).toHaveBeenCalled();
    });

  });

  describe('handleSuccess', () => {
    it('should set successMessage and showSuccess to true', () => {
      const response: ObjectStock = { email: 'Test email', password: 'Test password' };
      component['handleSuccess'](response);

      expect(component.successMessage).toBe("Formulario enviado exitosamente");
      expect(component.showSuccess).toBe(true);

      jest.advanceTimersByTime(2000); // Avanza el tiempo simulado
      expect(component.showSuccess).toBe(false);
    });
  });

  describe('handleError', () => {
    it('should set errorMessage and showError to true on error', () => {
      const errorResponse = { error: { message: 'Error' } };
      component['handleError'](errorResponse);
      
      expect(component.errorMessage).toBe('Error');
      expect(component.showError).toBe(true);

      jest.advanceTimersByTime(2000); // Avanza el tiempo simulado
      expect(component.showError).toBe(false);
    });
  });

  describe('getFormControl', () => {
    it('should return the FormControl for a given control email', () => {
      const nameControl = component.nameControl('email');
      expect(nameControl).toBe(component.loginForm.controls['email']);
    });
    
  });


  describe('send', () => {
    it('should mark all fields as touched if form is invalid', () => {
      const markAllAsTouchedSpy = jest.spyOn(component.loginForm, 'markAllAsTouched');
      component.loginForm.controls['email'].setValue(''); // nombre vacío (inválido)
      component.send();
      expect(markAllAsTouchedSpy).toHaveBeenCalled();
    });

    it('should not call create on the service if the form is invalid', () => {
      component.loginForm.controls['email'].setValue(''); // nombre vacío
      component.send();
      expect(mockService.create).not.toHaveBeenCalled(); // Verifica que no se haya llamado al servicio
    });

  

  });

  describe('form validations', () => {
    it('should validate the email field as required', () => {
      const nameControl = component.nameControl('email');
      nameControl.setValue('');
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.errors?.['required']).toBeTruthy();
    });

    it('should validate the description field as required', () => {
      const descriptionControl = component.nameControl('password');
      descriptionControl.setValue('');
      expect(descriptionControl.valid).toBeFalsy();
      expect(descriptionControl.errors?.['required']).toBeTruthy();
    });


  });
 
});
