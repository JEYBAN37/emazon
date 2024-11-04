import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardBrandComponent } from './card-brand.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OBJECT_SERVICE, ObjectServiceInterface, ObjectStock } from 'src/app/shared/services/stock-service-interface';
import { of, throwError } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

describe('CardBrandComponent', () => {
  let component: CardBrandComponent;
  let fixture: ComponentFixture<CardBrandComponent>;
  let mockService: jest.Mocked<ObjectServiceInterface>;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(async () => {
    jest.useFakeTimers(); 
    mockService = {
        create: jest.fn(),
        get: jest.fn()
      } as jest.Mocked<ObjectServiceInterface>;
  
      await TestBed.configureTestingModule({
        declarations: [CardBrandComponent],
        providers: [
          FormBuilder,
          { provide: OBJECT_SERVICE, useValue: mockService },
          ChangeDetectorRef
        ],
        imports: [ReactiveFormsModule]
      }).compileComponents();
  
      fixture = TestBed.createComponent(CardBrandComponent);
      component = fixture.componentInstance;
      changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
      component.service = mockService;
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
      expect(component.brandForm.value).toEqual({
        name: '',
        description: ''
      });
    });
  });


  describe('send', () => {
    it('should mark all fields as touched if form is invalid', () => {
      const markAllAsTouchedSpy = jest.spyOn(component.brandForm, 'markAllAsTouched');
      component.brandForm.controls['name'].setValue(''); // name vacío (inválido)
      component.send();
      expect(markAllAsTouchedSpy).toHaveBeenCalled();
    });

    it('should call create on the service if the form is valid', () => {
      component.brandForm.controls['name'].setValue('Test Name');
      component.brandForm.controls['description'].setValue('Test Description');
      
      const objectStock: ObjectStock = { name: 'Test Name', description: 'Test Description' };
      mockService.create.mockReturnValue(of(objectStock));
      
      component.send();
      expect(mockService.create).toHaveBeenCalledWith(objectStock);
    });

    it('should call handleSuccess on successful submission', () => {
      const handleSuccessSpy = jest.spyOn(component as any, 'handleSuccess');
      component.brandForm.controls['name'].setValue('Test Name');
      component.brandForm.controls['description'].setValue('Test Description');

      const response: ObjectStock = { name: 'Test Name', description: 'Test Description' };
      mockService.create.mockReturnValue(of(response));

      component.send();
      expect(handleSuccessSpy).toHaveBeenCalledWith(response);
    });

    it('should call handleError on failed submission', () => {
      const handleErrorSpy = jest.spyOn(component as any, 'handleError');
      component.brandForm.controls['name'].setValue('Test Name');
      component.brandForm.controls['description'].setValue('Test Description');

      const errorResponse = { error: { message: 'Error' } };
      mockService.create.mockReturnValue(throwError(() => errorResponse));

      component.send();
      expect(handleErrorSpy).toHaveBeenCalledWith(errorResponse);
    });
  });

  describe('handleSuccess', () => {
    it('should set successMessage and showSuccess to true', () => {
      const response: ObjectStock = { name: 'Test Name', description: 'Test Description' };
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
    it('should return the FormControl for a given control name', () => {
      const nameControl = component.nameControl('name');
      expect(nameControl).toBe(component.brandForm.controls['name']);
    });
    
  });


  describe('send', () => {
    it('should mark all fields as touched if form is invalid', () => {
      const markAllAsTouchedSpy = jest.spyOn(component.brandForm, 'markAllAsTouched');
      component.brandForm.controls['name'].setValue(''); // nombre vacío (inválido)
      component.send();
      expect(markAllAsTouchedSpy).toHaveBeenCalled();
    });

    it('should not call create on the service if the form is invalid', () => {
      component.brandForm.controls['name'].setValue(''); // nombre vacío
      component.send();
      expect(mockService.create).not.toHaveBeenCalled(); // Verifica que no se haya llamado al servicio
    });

    it('should call create on the service if the form is valid', () => {
      component.brandForm.controls['name'].setValue('Test Name');
      component.brandForm.controls['description'].setValue('Test Description');
      
      const objectStock: ObjectStock = { name: 'Test Name', description: 'Test Description' };
      mockService.create.mockReturnValue(of(objectStock));
      
      component.send();
      expect(mockService.create).toHaveBeenCalledWith(objectStock);
    });
    it('should call handleSuccess on successful submission', () => {
      const handleSuccessSpy = jest.spyOn(component as any, 'handleSuccess');
      component.brandForm.controls['name'].setValue('Test Name');
      component.brandForm.controls['description'].setValue('Test Description');
  
      const response: ObjectStock = { name: 'Test Name', description: 'Test Description' };
      mockService.create.mockReturnValue(of(response));
  
      component.send();
      expect(handleSuccessSpy).toHaveBeenCalledWith(response);
  });
  
  it('should call handleError on failed submission', () => {
      const handleErrorSpy = jest.spyOn(component as any, 'handleError');
      component.brandForm.controls['name'].setValue('Test Name');
      component.brandForm.controls['description'].setValue('Test Description');
  
      const errorResponse = { error: { message: 'Error' } };
      mockService.create.mockReturnValue(throwError(() => errorResponse));
  
      component.send();
      expect(handleErrorSpy).toHaveBeenCalledWith(errorResponse);
  });
  });

  describe('form validations', () => {
    it('should validate the name field as required', () => {
      const nameControl = component.nameControl('name');
      nameControl.setValue('');
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.errors?.['required']).toBeTruthy();
    });

    it('should validate the description field as required', () => {
      const descriptionControl = component.nameControl('description');
      descriptionControl.setValue('');
      expect(descriptionControl.valid).toBeFalsy();
      expect(descriptionControl.errors?.['required']).toBeTruthy();
    });

    it('should validate name maximum length', () => {
      const nameControl = component.nameControl('name');
      nameControl.setValue('A very long name that exceeds the maximum length allowed');
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.errors?.['maxlength']).toBeTruthy();
    });

  });
 
});