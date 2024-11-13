import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendSupplyComponent } from './send-supply.component';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { SupplyService } from 'src/app/shared/services/supply/supply.service';
import { ChangeDetectorRef } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Supply } from 'src/app/shared/models/supply-interface';

describe('SendSupplyComponent', () => {
  let component: SendSupplyComponent;
  let fixture: ComponentFixture<SendSupplyComponent>;
  let mockAlertService: AlertMessageService;
  let mockSupplyService: SupplyService;

  beforeEach(async () => {
    mockAlertService = {
      showError: jest.fn(),
      showSuccess: jest.fn(),
    } as unknown as AlertMessageService;

    mockSupplyService = {
      fetchSupplyData: jest.fn(),
    } as unknown as SupplyService;

    await TestBed.configureTestingModule({
      declarations: [SendSupplyComponent],
      providers: [
        { provide: AlertMessageService, useValue: mockAlertService },
        { provide: SupplyService, useValue: mockSupplyService },
        ChangeDetectorRef,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize inputs with default values', () => {
    expect(component.fieldsToDisplay).toEqual([]);
    expect(component.supplies).toEqual([]);
    expect(component.label).toBeUndefined();
    expect(component.description).toBeUndefined();
    expect(component.columns).toEqual([]);
  });

  it('should show error if sendSupplies is called with empty supplies array', () => {
    component.sendSupplies();
    expect(mockAlertService.showError).toHaveBeenCalledWith('No se han agregado suministros');
  });

  it('should call supplyService and emit event on successful sendSupplies', () => {
    component.supplies = [{ id: 1, name: 'Supply 1' } as Supply];
    jest.spyOn(mockSupplyService, 'fetchSupplyData').mockReturnValue(of());
    jest.spyOn(component.suppliesUpdated, 'emit');
    const showSuccessSpy = jest.spyOn(mockAlertService, 'showSuccess').mockReturnValue(
      mockAlertService.showSuccess('Suministros enviados exitosamente'));
    component.sendSupplies();

    expect(mockSupplyService.fetchSupplyData).toHaveBeenCalledWith(component.supplies);
    expect(showSuccessSpy).toHaveBeenCalledWith('Suministros enviados exitosamente');
    expect(component.supplies).toEqual([{ id: 1, name: 'Supply 1' } as Supply]);
  });

  it('should show error if sendSupplies fails', () => {
    component.supplies = [{ id: 1, name: 'Supply 1' } as Supply];
    jest.spyOn(mockSupplyService, 'fetchSupplyData').mockReturnValue(throwError({ error: { message: 'Error' } }));

    component.sendSupplies();

    expect(mockSupplyService.fetchSupplyData).toHaveBeenCalledWith(component.supplies);
    expect(mockAlertService.showError).toHaveBeenCalledWith('Error');
  });

  it('should show default error message if sendSupplies fails without a specific error', () => {
    component.supplies = [{ id: 1, name: 'Supply 1' } as Supply];
    jest.spyOn(mockSupplyService, 'fetchSupplyData').mockReturnValue(throwError({}));

    component.sendSupplies();

    expect(mockAlertService.showError).toHaveBeenCalledWith('Hubo un error al enviar');
  });

  it('should add a supply to supplies array on onSupplyAdded', () => {
    const newSupply = { id: 2, name: 'Supply 2' } as Supply;
    component.onSupplyAdded(newSupply);
    expect(component.supplies).toContain(newSupply);
  });

  it('should remove a supply from supplies array on removeSupply', () => {
    component.supplies = [{ id: 1, name: 'Supply 1' } as Supply];
    component.removeSupply(0);
    expect(component.supplies.length).toBe(0);
  });

  it('should correctly return property value from a simple key', () => {
    const obj = { name: 'Supply1' };
    const value = component.getPropertyValue(obj, 'name');
    expect(value).toBe('Supply1');
  });

  it('should correctly return nested property value from a dotted key', () => {
    const obj = { details: { name: 'NestedSupply' } };
    const value = component.getPropertyValue(obj, 'details.name');
    expect(value).toBe('NestedSupply');
  });

  it('should return undefined if the property does not exist', () => {
    const obj = { name: 'Supply1' };
    const value = component.getPropertyValue(obj, 'nonexistent');
    expect(value).toBeUndefined();
  });

  it('should return undefined if a nested property path is partially missing', () => {
    const obj = { details: { name: 'NestedSupply' } };
    const value = component.getPropertyValue(obj, 'details.nonexistent');
    expect(value).toBeUndefined();
  });
});

