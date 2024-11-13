import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponseSupplyComponent } from './response-supply.component';
import { SupplyDetails } from 'src/app/shared/models/supply-interface';

describe('ResponseSupplyComponent', () => {
  let component: ResponseSupplyComponent;
  let fixture: ComponentFixture<ResponseSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponseSupplyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseSupplyComponent);
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
