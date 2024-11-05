import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder,  ReactiveFormsModule } from '@angular/forms';
import { OBJECT_SERVICE, ObjectServiceInterface, ObjectStock } from 'src/app/shared/services/stock-service-interface';
import { CardArticleComponent } from './card-article.component';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

describe('CardArticleComponent', () => {
  let component: CardArticleComponent;
  let fixture: ComponentFixture<CardArticleComponent>;
  let mockService: jest.Mocked<ObjectServiceInterface>;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(async () => {
    mockService = {
      create: jest.fn(),
      get: jest.fn()
    } as jest.Mocked<ObjectServiceInterface>;

    await TestBed.configureTestingModule({
      declarations: [CardArticleComponent],
      providers: [
        FormBuilder,
        { provide: OBJECT_SERVICE, useValue: mockService },
        ChangeDetectorRef
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardArticleComponent);
    component = fixture.componentInstance;
    changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
    component.service = mockService;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the form', () => {
      component.ngOnInit();
      expect(component.articleForm).toBeTruthy();
      expect(component.articleForm.controls['name'].value).toBe('');
      expect(component.articleForm.controls['description'].value).toBe('');
    });
  });

  describe('initForm', () => {
    it('should set up the form with required controls', () => {
      component.initForm();
      expect(component.articleForm.controls['name']).toBeTruthy();
      expect(component.articleForm.controls['description']).toBeTruthy();
      expect(component.articleForm.controls['quantity']).toBeTruthy();
      expect(component.articleForm.controls['price']).toBeTruthy();
      expect(component.articleForm.controls['brand']).toBeTruthy();
      expect(component.articleForm.controls['articleCategories']).toBeTruthy();
    });
  });

  describe('send', () => {
    it('should mark all fields as touched if the form is invalid', () => {
      const markAllAsTouchedSpy = jest.spyOn(component.articleForm, 'markAllAsTouched');
      component.articleForm.controls['name'].setValue(''); // Invalid input
      component.send();
      expect(markAllAsTouchedSpy).toHaveBeenCalled();
    });

    it('should not call create on the service if the form is invalid', () => {
      component.articleForm.controls['name'].setValue(''); // Invalid input
      component.send();
      expect(mockService.create).not.toHaveBeenCalled();
    });

    it('should call create on the service if the form is valid', () => {
      component.articleForm.controls['name'].setValue('Test Name');
      component.articleForm.controls['description'].setValue('Test Description');
      component.articleForm.controls['quantity'].setValue(1);
      component.articleForm.controls['price'].setValue(100);
      component.articleForm.controls['brand'].setValue('Brand A');

      const objectStock: ObjectStock = {
        name: 'Test Name',
        description: 'Test Description',
        quantity: 1,
        price: 100,
        brand: 'Brand A',
        articleCategories: []
      };
      mockService.create.mockReturnValue(of(objectStock));

      component.send();
      expect(mockService.create).toHaveBeenCalledWith(objectStock);
    });

    it('should call handleSuccess on successful submission', () => {
      const handleSuccessSpy = jest.spyOn(component as any, 'handleSuccess');
      component.articleForm.controls['name'].setValue('Test Name');
      component.articleForm.controls['description'].setValue('Test Description');
      component.articleForm.controls['quantity'].setValue(1);
      component.articleForm.controls['price'].setValue(100);
      component.articleForm.controls['brand'].setValue('Brand A');

      const response: ObjectStock = {
        name: 'Test Name',
        description: 'Test Description',
        quantity: 1,
        price: 100,
        brand: 'Brand A',
        articleCategories: []
      };
      mockService.create.mockReturnValue(of(response));

      component.send();
      expect(handleSuccessSpy).toHaveBeenCalledWith(response);
    });

    it('should call handleError on failed submission', () => {
      const handleErrorSpy = jest.spyOn(component as any, 'handleError');
      component.articleForm.controls['name'].setValue('Test Name');
      component.articleForm.controls['description'].setValue('Test Description');
      component.articleForm.controls['quantity'].setValue(1);
      component.articleForm.controls['price'].setValue(100);
      component.articleForm.controls['brand'].setValue('Brand A');

      const errorResponse = { error: { message: 'Error' } };
      mockService.create.mockReturnValue(throwError(() => errorResponse));

      component.send();
      expect(handleErrorSpy).toHaveBeenCalledWith(errorResponse);
    });

    it('should call handleSuccess on successful submission', () => {
      const response = { id: 1, ...component.articleForm.value };
      mockService.create.mockReturnValue(of(response));

      const successSpy = jest.spyOn(component, 'handleSuccess');
      const errorSpy = jest.spyOn(component, 'handleError');

      component.send();

      expect(mockService.create).toHaveBeenCalledWith(component.articleForm.value);
      expect(successSpy).toHaveBeenCalledWith(response);
      expect(errorSpy).not.toHaveBeenCalled();
      expect(component.showSuccess).toBe(true);
    });

    it('should call handleError on error response', () => {
      const errorResponse = { error: { message: 'Failed to submit' } };
      mockService.create.mockReturnValue(throwError(() => errorResponse));

      const successSpy = jest.spyOn(component, 'handleSuccess');
      const errorSpy = jest.spyOn(component, 'handleError');

      component.send();

      expect(mockService.create).toHaveBeenCalledWith(component.articleForm.value);
      expect(successSpy).not.toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith(errorResponse);
      expect(component.showError).toBe(true);
      expect(component.errorMessage).toBe('Failed to submit');
    });
  });

  describe('handleSuccess', () => {
    it('should set successMessage and showSuccess to true', () => {
      const response: ObjectStock = { name: 'Test Name', description: 'Test Description', quantity: 1, price: 100, brand: 'Brand A', articleCategories: [] };
      component['handleSuccess'](response);

      expect(component.successMessage).toBe('Formulario enviado exitosamente');
      expect(component.showSuccess).toBe(true);
    });
  });

  describe('handleError', () => {
    it('should set errorMessage and showError to true on error', () => {
      const errorResponse = { error: { message: 'Error' } };
      component['handleError'](errorResponse);
      
      expect(component.errorMessage).toBe('Error');
      expect(component.showError).toBe(true);
    });
  });

  describe('form validations', () => {
    beforeEach(() => {
      component.initForm();
    });

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

    it('should validate quantity and price fields as required', () => {
      const quantityControl = component.nameControl('quantity');
      quantityControl.setValue('');
      expect(quantityControl.valid).toBeFalsy();
      expect(quantityControl.errors?.['required']).toBeTruthy();

      const priceControl = component.nameControl('price');
      priceControl.setValue('');
      expect(priceControl.valid).toBeFalsy();
      expect(priceControl.errors?.['required']).toBeTruthy();
    });

    it('should validate name maximum length', () => {
      const nameControl = component.nameControl('name');
      nameControl.setValue('A very long name that exceeds the maximum length allowed');
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.errors?.['maxlength']).toBeTruthy();
    });

    it('should validate description maximum length', () => {
      const descriptionControl = component.nameControl('description');
      descriptionControl.setValue('A very long description that exceeds the maximum length allowed');
      expect(descriptionControl.valid).toBeFalsy();
      expect(descriptionControl.errors?.['maxlength']).toBeTruthy();
    });
  });
});

describe('CardArticleComponent', () => {
  let component: CardArticleComponent;
  let fixture: ComponentFixture<CardArticleComponent>;
  let mockService: jest.Mocked<ObjectServiceInterface>;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(async () => {
    jest.useFakeTimers();
    mockService = {
      create: jest.fn(),
      get: jest.fn()
    } as jest.Mocked<ObjectServiceInterface>;

    await TestBed.configureTestingModule({
      declarations: [CardArticleComponent],
      providers: [
        FormBuilder,
        { provide: OBJECT_SERVICE, useValue: mockService },
        ChangeDetectorRef
      ],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CardArticleComponent);
    component = fixture.componentInstance;
    changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
    component.service = mockService;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('initForm', () => {
    it('should initialize the form with default values', () => {
      component.ngOnInit();
      expect(component.articleForm.value).toEqual({
        name: '',
        description: '',
        quantity: '',
        price: '',
        brand: '',
        articleCategories: []
      });
    });
  });

  describe('send', () => {
    it('should mark all fields as touched if form is invalid', () => {
      const markAllAsTouchedSpy = jest.spyOn(component.articleForm, 'markAllAsTouched');
      component.articleForm.controls['name'].setValue(''); // Invalid name
      component.send();
      expect(markAllAsTouchedSpy).toHaveBeenCalled();
    });

    it('should not call create on the service if the form is invalid', () => {
      component.articleForm.controls['name'].setValue(''); // Invalid name
      component.send();
      expect(mockService.create).not.toHaveBeenCalled();
    });

    it('should call create on the service if the form is valid', () => {
      component.articleForm.controls['name'].setValue('Test Name');
      component.articleForm.controls['description'].setValue('Test Description');
      component.articleForm.controls['quantity'].setValue(1);
      component.articleForm.controls['price'].setValue(100);
      component.articleForm.controls['brand'].setValue('Brand A');
      component.articleForm.controls['articleCategories'].setValue([133535]);

      const objectStock: ObjectStock = {
        name: 'Test Name',
        description: 'Test Description',
        quantity: 1,
        price: 100,
        brand: 'Brand A',
        articleCategories: [133535]
      };
      mockService.create.mockReturnValue(of(objectStock));

      component.send();
      expect(mockService.create).toHaveBeenCalledWith(objectStock);
    });

    it('should call handleSuccess on successful submission', () => {
      const handleSuccessSpy = jest.spyOn(component as any, 'handleSuccess');
      component.articleForm.controls['name'].setValue('Test Name');
      component.articleForm.controls['description'].setValue('Test Description');
      component.articleForm.controls['quantity'].setValue(1);
      component.articleForm.controls['price'].setValue(100);
      component.articleForm.controls['brand'].setValue('Brand A');

      const response: ObjectStock = {
        name: 'Test Name',
        description: 'Test Description',
        quantity: 1,
        price: 100,
        brand: 'Brand A',
        articleCategories: [133535]
      };
      mockService.create.mockReturnValue(of(response));

      component.send();
      expect(handleSuccessSpy).toHaveBeenCalledWith(response);
    });

    it('should call handleError on failed submission', () => {
      const handleErrorSpy = jest.spyOn(component as any, 'handleError');
      component.articleForm.controls['name'].setValue('Test Name');
      component.articleForm.controls['description'].setValue('Test Description');
      component.articleForm.controls['quantity'].setValue(1);
      component.articleForm.controls['price'].setValue(100);
      component.articleForm.controls['brand'].setValue('Brand A');

      const errorResponse = { error: { message: 'Error' } };
      mockService.create.mockReturnValue(throwError(() => errorResponse));

      component.send();
      expect(handleErrorSpy).toHaveBeenCalledWith(errorResponse);
    });
  });

  describe('handleSuccess', () => {
    it('should set successMessage and showSuccess to true', () => {
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
      expect(component.showSuccess).toBe(false);
    });
  });

  describe('handleError', () => {
    it('should set errorMessage and showError to true on error', () => {
      const errorResponse = { error: { message: 'Error' } };
      component['handleError'](errorResponse);

      expect(component.errorMessage).toBe('Error');
      expect(component.showError).toBe(true);
      expect(component.successMessage).toBeNull();

      jest.advanceTimersByTime(2000);
      expect(component.showError).toBe(false);
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

    it('should validate quantity as required', () => {
      const quantityControl = component.nameControl('quantity');
      quantityControl.setValue('');
      expect(quantityControl.valid).toBeFalsy();
      expect(quantityControl.errors?.['required']).toBeTruthy();
    });

    it('should validate price as required', () => {
      const priceControl = component.nameControl('price');
      priceControl.setValue('');
      expect(priceControl.valid).toBeFalsy();
      expect(priceControl.errors?.['required']).toBeTruthy();
    });

    it('should validate brand as required', () => {
      const brandControl = component.nameControl('brand');
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

    it('should validate description maximum length', () => {
      const descriptionControl = component.nameControl('description');
      descriptionControl.setValue('A very long description that exceeds the maximum length allowed');
      expect(descriptionControl.valid).toBeFalsy();
      expect(descriptionControl.errors?.['maxlength']).toBeTruthy();
    });
  });
});

describe('CardArticleComponent', () => {
  let component: CardArticleComponent;
  let fixture: ComponentFixture<CardArticleComponent>;
  let mockService: jest.Mocked<ObjectServiceInterface>;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(async () => {
    jest.useFakeTimers();
    mockService = {
      create: jest.fn(),
      get: jest.fn()
    } as jest.Mocked<ObjectServiceInterface>;

    await TestBed.configureTestingModule({
      declarations: [CardArticleComponent],
      providers: [
        FormBuilder,
        { provide: OBJECT_SERVICE, useValue: mockService },
        ChangeDetectorRef
      ],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CardArticleComponent);
    component = fixture.componentInstance;
    changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
    component.service = mockService;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('initForm', () => {
    it('should initialize the form with default values', () => {
      component.ngOnInit();
      expect(component.articleForm.value).toEqual({
        name: '',
        description: '',
        quantity: '',
        price: '',
        brand: '',
        articleCategories: []
      });
    });
  });

  describe('send', () => {
    it('should mark all fields as touched if form is invalid', () => {
      const markAllAsTouchedSpy = jest.spyOn(component.articleForm, 'markAllAsTouched');
      component.articleForm.controls['name'].setValue(''); // Invalid name
      component.send();
      expect(markAllAsTouchedSpy).toHaveBeenCalled();
    });

    it('should not call create on the service if the form is invalid', () => {
      component.articleForm.controls['name'].setValue(''); // Invalid name
      component.send();
      expect(mockService.create).not.toHaveBeenCalled();
    });

    it('should call create on the service if the form is valid', () => {
      component.articleForm.controls['name'].setValue('Test Name');
      component.articleForm.controls['description'].setValue('Test Description');
      component.articleForm.controls['quantity'].setValue(1);
      component.articleForm.controls['price'].setValue(100);
      component.articleForm.controls['brand'].setValue('Brand A');
      component.articleForm.controls['articleCategories'].setValue([133535]);

      const objectStock: ObjectStock = {
        name: 'Test Name',
        description: 'Test Description',
        quantity: 1,
        price: 100,
        brand: 'Brand A',
        articleCategories: [133535]
      };
      mockService.create.mockReturnValue(of(objectStock));

      component.send();
      expect(mockService.create).toHaveBeenCalledWith(objectStock);
    });

    it('should call handleSuccess on successful submission', () => {
      const handleSuccessSpy = jest.spyOn(component as any, 'handleSuccess');
      component.articleForm.controls['name'].setValue('Test Name');
      component.articleForm.controls['description'].setValue('Test Description');
      component.articleForm.controls['quantity'].setValue(1);
      component.articleForm.controls['price'].setValue(100);
      component.articleForm.controls['brand'].setValue('Brand A');

      const response: ObjectStock = {
        name: 'Test Name',
        description: 'Test Description',
        quantity: 1,
        price: 100,
        brand: 'Brand A',
        articleCategories: [133535]
      };
      mockService.create.mockReturnValue(of(response));

      component.send();
      expect(handleSuccessSpy).toHaveBeenCalledWith(response);
    });

    it('should call handleError on failed submission', () => {
      const handleErrorSpy = jest.spyOn(component as any, 'handleError');
      component.articleForm.controls['name'].setValue('Test Name');
      component.articleForm.controls['description'].setValue('Test Description');
      component.articleForm.controls['quantity'].setValue(1);
      component.articleForm.controls['price'].setValue(100);
      component.articleForm.controls['brand'].setValue('Brand A');

      const errorResponse = { error: { message: 'Error' } };
      mockService.create.mockReturnValue(throwError(() => errorResponse));

      component.send();
      expect(handleErrorSpy).toHaveBeenCalledWith(errorResponse);
    });
  });

  describe('handleSuccess', () => {
    it('should set successMessage and showSuccess to true', () => {
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
      expect(component.showSuccess).toBe(false);
    });
  });

  describe('handleError', () => {
    it('should set errorMessage and showError to true on error', () => {
      const errorResponse = { error: { message: 'Error' } };
      component['handleError'](errorResponse);

      expect(component.errorMessage).toBe('Error');
      expect(component.showError).toBe(true);
      expect(component.successMessage).toBeNull();

      // Simulate the passage of time
      jest.advanceTimersByTime(2000);
      
      // Verify that showError is now false
      expect(component.showError).toBe(false);
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

    it('should validate quantity as required', () => {
      const quantityControl = component.nameControl('quantity');
      quantityControl.setValue('');
      expect(quantityControl.valid).toBeFalsy();
      expect(quantityControl.errors?.['required']).toBeTruthy();
    });

    it('should validate price as required', () => {
      const priceControl = component.nameControl('price');
      priceControl.setValue('');
      expect(priceControl.valid).toBeFalsy();
      expect(priceControl.errors?.['required']).toBeTruthy();
    });

    it('should validate brand as required', () => {
      const brandControl = component.nameControl('brand');
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

    it('should validate description maximum length', () => {
      const descriptionControl = component.nameControl('description');
      descriptionControl.setValue('A very long description that exceeds the maximum length allowed');
      expect(descriptionControl.valid).toBeFalsy();
      expect(descriptionControl.errors?.['maxlength']).toBeTruthy();
    });
  });

  it('should handle error if service call fails with a message', async () => {
    component.articleForm.setValue({ name: 'Brand Name', description: 'Brand Description' });
    mockService.create.mockReturnValue(throwError(() => ({ error: { message: 'Error occurred' } })));

    await component.send();

    expect(component.errorMessage).toBe('Error occurred');
    expect(component.showError).toBe(true);
    expect(component.successMessage).toBeNull();

    // Verify error message disappears after timeout
    jest.useFakeTimers();
    jest.advanceTimersByTime(2001);
    expect(component.showError).toBe(false);
    jest.useRealTimers();
  });

  it('should handle error if service call fails without a message', async () => {
    component.articleForm.setValue({ name: 'Brand Name', description: 'Brand Description' });
    mockService.create.mockReturnValue(throwError(() => ({ error: {} }))); // Simulate error with no message

    await component.send();

    expect(component.errorMessage).toBe('Hubo un error al enviar'); // Default error message
    expect(component.showError).toBe(true);
    expect(component.successMessage).toBeNull();

    // Verify error message disappears after timeout
    jest.useFakeTimers();
    jest.advanceTimersByTime(2001);
    expect(component.showError).toBe(false);
    jest.useRealTimers();
  });

  describe('CardArticleComponent handleError method', () => {
    let component: CardArticleComponent;
    let fixture: ComponentFixture<CardArticleComponent>;
    let cdr: ChangeDetectorRef;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CardArticleComponent],
        providers: [
          FormBuilder,
          ChangeDetectorRef,
        ],
        imports: [ReactiveFormsModule]
      }).compileComponents();
  
      fixture = TestBed.createComponent(CardArticleComponent);
      component = fixture.componentInstance;
      cdr = TestBed.inject(ChangeDetectorRef);
      jest.spyOn(cdr, 'detectChanges'); // Spy on detectChanges to verify it's called
    });
  
    it('should set errorMessage and showError, and clear successMessage', () => {
      const errorResponse = { error: { message: 'Failed to submit' } };
  
      component.handleError(errorResponse);
  
      // Validate errorMessage is set correctly
      expect(component.errorMessage).toBe('Failed to submit');
  
      // Validate showError is set to true
      expect(component.showError).toBe(true);
  
      // Validate successMessage is cleared
      expect(component.successMessage).toBeNull();
  
      // Validate detectChanges is called
      expect(cdr.detectChanges).toHaveBeenCalled();
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
  
      expect(component.showError).toBe(true); // Initially true
      tick(2000); // Simulate 2 seconds passing
      expect(component.showError).toBe(false); // Should be false after timeout
      expect(cdr.detectChanges).toHaveBeenCalledTimes(2); // Called twice
    }));
  });
});



