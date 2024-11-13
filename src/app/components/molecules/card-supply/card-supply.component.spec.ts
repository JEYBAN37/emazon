import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardSupplyComponent } from './card-supply.component';
import { FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { SupplyFormBuilderService } from 'src/app/shared/services/supply/supply-form-builder.service';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { Supply } from 'src/app/shared/models/supply-interface';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { jest } from '@jest/globals';

describe('CardSupplyComponent', () => {
  let component: CardSupplyComponent;
  let fixture: ComponentFixture<CardSupplyComponent>;
  let mockSupplyFormBuilderService: jest.Mocked<SupplyFormBuilderService>;
  let mockValidationService: jest.Mocked<ValidationService>;
  let mockAlertService: jest.Mocked<AlertMessageService>;

  beforeEach(async () => {
    mockSupplyFormBuilderService = {
      initSupplyForm: jest.fn().mockReturnValue(new FormBuilder().group({
        idArticle: [''],
        quantity: [''],
        state: ['']
      })),
    } as unknown as jest.Mocked<SupplyFormBuilderService>;

    mockValidationService = {
      markFormGroupTouched: jest.fn(),
    } as jest.Mocked<ValidationService>;

    mockAlertService = {
      showSuccess: jest.fn(),
    } as unknown as jest.Mocked<AlertMessageService>;

    await TestBed.configureTestingModule({
      declarations: [CardSupplyComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: SupplyFormBuilderService, useValue: mockSupplyFormBuilderService },
        { provide: ValidationService, useValue: mockValidationService },
        { provide: AlertMessageService, useValue: mockAlertService },
        ChangeDetectorRef,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardSupplyComponent);
    component = fixture.componentInstance;
    component.ngOnInit(); // Initialize component and form
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(mockSupplyFormBuilderService.initSupplyForm).toHaveBeenCalled();
    expect(component.supplyForm).toBeDefined();
  });

  it('should add supply to supplyToSend and emit supplyAdded event if form is valid', () => {
    const sampleSupply: Supply = { idArticle: 1, quantity: 10, state: 'Disponible' };
    component.supplyForm.setValue(sampleSupply);

    const supplyAddedSpy = jest.spyOn(component.supplyAdded, 'emit');
    const showSuccessSpy = jest.spyOn(mockAlertService, 'showSuccess').mockReturnValue(
      mockAlertService.showSuccess('Marca creada exitosamente'));
      
    component.getData();

    expect(showSuccessSpy).toHaveBeenCalledWith('Marca creada exitosamente');
    expect(component.supplyToSend.length).toBe(1);
    expect(component.supplyToSend[0]).toEqual(sampleSupply);
    expect(supplyAddedSpy).toHaveBeenCalledWith(sampleSupply);
  });

  it('should reset the form after adding supply', () => {
    const sampleSupply: Supply = { idArticle: 1, quantity: 10, state: 'Disponible' };
    component.supplyForm.setValue(sampleSupply);
    
    component.getData();

    expect(component.supplyForm.value).toEqual({ idArticle: null, quantity: null, state: null });
  });

  it('should handle invalid form in getData', () => {
    component.supplyForm.get('idArticle')?.setValue('');
    component.supplyForm.get('quantity')?.setValue('');
    component.supplyForm.get('state')?.setValue('');

    component.getData();

    expect(component.supplyToSend.length).toBe(1);
  });

  it('should return a FormControl when getFormControl is called with a valid control name', () => {
    const control = component.getFormControl('idArticle');
    expect(control).toBeTruthy();
    expect(control instanceof FormControl).toBe(true);
  });

});
