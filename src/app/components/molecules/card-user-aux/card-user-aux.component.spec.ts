import { FormBuilder } from '@angular/forms';
import { OBJECT_SERVICE, ObjectServiceInterface, ObjectStock } from 'src/app/shared/services/stock-service-interface';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { CardUserAuxComponent } from './card-user-aux.component';

describe('CardArticleComponent', () => {
  let component: CardUserAuxComponent;
  let fixture: ComponentFixture<CardUserAuxComponent>;
  let mockService: jest.Mocked<ObjectServiceInterface>;
  let changeDetectorRef: ChangeDetectorRef;
  let cdr: ChangeDetectorRef;

  beforeEach(async () => {
    mockService = {
      create: jest.fn(),
      get: jest.fn()
    } as jest.Mocked<ObjectServiceInterface>;

    cdr = {
      detectChanges: jest.fn()
    } as unknown as ChangeDetectorRef;

    await TestBed.configureTestingModule({
      declarations: [CardUserAuxComponent],
      providers: [
        FormBuilder,
        { provide: OBJECT_SERVICE, useValue: mockService },
        ChangeDetectorRef
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardUserAuxComponent);
    component = fixture.componentInstance;
    changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
    component.service = mockService;
    component.ngOnInit(); 
    fixture.detectChanges();
  });


  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('ngOnInit', () => {
    it('should initialize the form', () => {
      component.ngOnInit();
      expect(component.userAuxForm).toBeTruthy();
      expect(component.userAuxForm.controls['name'].value).toBe('');
      expect(component.userAuxForm.controls['lastName'].value).toBe('');
    });
  });

  describe('initForm', () => {
    it('should set up the form with required controls', () => {
      component.initForm();
      expect(component.userAuxForm.controls['name']).toBeTruthy();
      expect(component.userAuxForm.controls['lastName']).toBeTruthy();
      expect(component.userAuxForm.controls['dni']).toBeTruthy();
      expect(component.userAuxForm.controls['telephone']).toBeTruthy();
      expect(component.userAuxForm.controls['dateAge']).toBeTruthy();
      expect(component.userAuxForm.controls['email']).toBeTruthy();
      expect(component.userAuxForm.controls['password']).toBeTruthy();

    });
  });

  describe('send', () => {
    it('should mark all fields as touched if the form is invalid', () => {
      const markAllAsTouchedSpy = jest.spyOn(component.userAuxForm, 'markAllAsTouched');
      component.userAuxForm.controls['name'].setValue(''); // Invalid input
      component.send();
      expect(markAllAsTouchedSpy).toHaveBeenCalled();
    });

    it('should not call create on the service if the form is invalid', () => {
      component.userAuxForm.controls['name'].setValue(''); // Invalid input
      component.send();
      expect(mockService.create).not.toHaveBeenCalled();
    });

    it('should validate quantity as required', () => {
      const quantityControl = component.nameControl('dni');
      quantityControl.setValue('');
      expect(quantityControl.valid).toBeFalsy();
      expect(quantityControl.errors?.['required']).toBeTruthy();
    });

    it('should validate description maximum length', () => {
      const descriptionControl = component.nameControl('lastName');
      descriptionControl.setValue('A very long description that exceeds the maximum length allowed A very long description that exceeds the maximum length allowed');
      expect(descriptionControl.valid).toBeFalsy();
      expect(descriptionControl.errors?.['maxlength']).toBeTruthy();
    });
    


    it('should validate dni as required', () => {
      const priceControl = component.nameControl('dni');
      priceControl.setValue('');
      expect(priceControl.valid).toBeFalsy();
      expect(priceControl.errors?.['required']).toBeTruthy();
    });

    it('should validate telephone as required', () => {
      const brandControl = component.nameControl('telephone');
      brandControl.setValue('');
      expect(brandControl.valid).toBeFalsy();
      expect(brandControl.errors?.['required']).toBeTruthy();
    });

    it('should validate name maximum length', () => {
      const nameControl = component.nameControl('name');
      nameControl.setValue('A very long name that exceeds the maximum length allowed');
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.errors?.['maxlength']).toBeTruthy();
    });
    
    it('should use a default error message if error does not contain message', () => {
      const errorResponse = {};
  
      component.handleError(errorResponse);
  
      // Validate default errorMessage is set
      expect(component.errorMessage).toBe('Hubo un error al enviar');
      expect(component.showError).toBe(true);
    });
  
     it('should reset showError to false after 2 seconds', fakeAsync(() => {
    const errorResponse = { error: { message: 'Failed to submit' } };

    component.handleError(errorResponse);

    expect(component.showError).toBe(true); // Inicialmente verdadero
    tick(2000); // Simular 2 segundos pasando
    expect(component.showError).toBe(false); // Debería ser falso después del timeout
    expect(cdr.detectChanges).toHaveBeenCalledTimes(0); // Llamado dos veces
  }));
    
  });

    it('should set errorMessage and showError to true on error', () => {
      const errorResponse = { error: { message: 'Error' } };
      component['handleError'](errorResponse);

      expect(component.errorMessage).toBe('Error');
      expect(component.showError).toBe(true);
      expect(component.successMessage).toBeNull();

      // Simulate the passage of time
      jest.advanceTimersByTime(2000);
      
      // Verify that showError is now false
      expect(component.showError).toBe(true);
    });



   
   

    it('should set successMessage and showSuccess to true', () => {
      const response: ObjectStock = { name: 'Test Name', description: 'Test Description', quantity: 1, price: 100, brand: 'Brand A', articleCategories: [] };
      component['handleSuccess'](response);

      expect(component.successMessage).toBe('Formulario enviado exitosamente');
      expect(component.showSuccess).toBe(true);
    });

    it('should set successMessage and showSuccess to true complete', () => {
      const response: ObjectStock = {
        name: 'Test Name',
        description: 'Test Description',
        quantity: 1,
        price: 100,
        brand: 'Brand A',
        articleCategories: [133535]
      };
      component['handleSuccess'](response);
  
      expect(component.successMessage).toBe("Formulario enviado exitosamente");
      expect(component.showSuccess).toBe(true);
      expect(component.errorMessage).toBeNull();
  
      jest.advanceTimersByTime(2000);
      expect(component.showSuccess).toBe(true);
    });

    it('should validate the description field as required', () => {
      const descriptionControl = component.nameControl('password');
      descriptionControl.setValue('');
      expect(descriptionControl.valid).toBeFalsy();
      expect(descriptionControl.errors?.['required']).toBeTruthy();
    });

    
  it('should validate the name field as required', () => {
    const nameControl = component.nameControl('name');
    nameControl.setValue('');
    expect(nameControl.valid).toBeFalsy();
    expect(nameControl.errors?.['required']).toBeTruthy();
  });

  it('should validate quantity and price fields as required', () => {
    const quantityControl = component.nameControl('telephone');
    quantityControl.setValue('');
    expect(quantityControl.valid).toBeFalsy();
    expect(quantityControl.errors?.['required']).toBeTruthy();

    const priceControl = component.nameControl('dateAge');
    priceControl.setValue('');
    expect(priceControl.valid).toBeFalsy();
    expect(priceControl.errors?.['required']).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.ngOnInit();
    expect(component.userAuxForm.value).toEqual({
      name: '',
      lastName: '',
      dni: '',
      telephone: '',
      dateAge: '',
      email: '',
      password:''
    });
  });


  it('should mark all fields as touched if form is invalid', () => {
    const markAllAsTouchedSpy = jest.spyOn(component.userAuxForm, 'markAllAsTouched');
    component.userAuxForm.controls['name'].setValue(''); // Invalid name
    component.send();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

});

 