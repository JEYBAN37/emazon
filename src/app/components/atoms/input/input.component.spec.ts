import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
@Component({
  template: `
    <form [formGroup]="form">
      <app-input formControlName="testControl" label="Test Label"></app-input>
    </form>
  `
})
class TestHostComponent {
  testControl = new FormControl('');
  form = new FormGroup({
    testControl: new FormControl('')
  });
}

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let testHostComponent: TestHostComponent;
  let testHost: TestHostComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(); // Initialize the FormControl
  });

  it('should create the Input component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input properties', () => {
    expect(component.type).toBe('text');
    expect(component.errorMessages).toEqual([]);
  });

  it('should bind the FormControl correctly', () => {
    component.control.setValue('Test value');
    fixture.detectChanges(); // Trigger change detection
    const inputElement = fixture.debugElement.query(By.css('input'));
    expect(inputElement.nativeElement.value).toBe('Test value');
  });

  it('should display error messages when control is invalid', () => {
    component.errorMessages = [
      { key: 'required', message: 'This field is required.' },
      { key: 'minlength', message: 'Minimum length is 3.' }
    ];
    component.control.setErrors({ required: true }); // Simulate a validation error
    fixture.detectChanges(); // Trigger change detection

    const errorElement = fixture.debugElement.query(By.css('.error-messages'));
    expect(errorElement.nativeElement.textContent).toContain('This field is required.');

    component.control.setErrors({ minlength: true });
    fixture.detectChanges(); // Trigger change detection
    expect(errorElement.nativeElement.textContent).toContain('Minimum length is 3.');
  });

  it('should not display error messages when control is valid', () => {
    component.errorMessages = [
      { key: 'required', message: 'This field is required.' },
      { key: 'minlength', message: 'Minimum length is 3.' }
    ];
    component.control.setErrors(null); // Simulate a valid control
    fixture.detectChanges(); // Trigger change detection

    const errorElement = fixture.debugElement.query(By.css('.error-messages'));
    expect(errorElement).toBeNull(); // There should be no error messages
  });

  it('should bind correctly to FormControl as ControlValueAccessor', () => {
    const inputDebugElement = fixture.debugElement.query(By.css('input'));
    const inputElement: HTMLInputElement = inputDebugElement.nativeElement;

    // Set a value via FormControl and check if it reflects in the input element
    testHostComponent.testControl.setValue('Testing ControlValueAccessor');
    fixture.detectChanges();
    expect(inputElement.value).toBe('Testing ControlValueAccessor');

    // Update input element value and trigger an input event
    inputElement.value = 'Updated Value';
    inputDebugElement.triggerEventHandler('input', { target: inputElement });
    fixture.detectChanges();

    // Confirm that the FormControl value updates with input element changes
    expect(testHostComponent.testControl.value).toBe('Updated Value');
  });

  it('should register as ControlValueAccessor and sync value with FormControl', () => {
    const inputDebugElement = fixture.debugElement.query(By.css('input'));
    const inputElement: HTMLInputElement = inputDebugElement.nativeElement;

    // Test setting a value in FormControl updates the input element
    testHost.form.get('testControl')!.setValue('Test Value');
    fixture.detectChanges();
    expect(inputElement.value).toBe('Test Value');

    // Test typing in the input element updates the FormControl
    inputElement.value = 'Updated Value';
    inputDebugElement.triggerEventHandler('input', { target: inputElement });
    fixture.detectChanges();
    expect(testHost.form.get('testControl')!.value).toBe('Updated Value');
  });
});
