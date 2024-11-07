import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  it('should initialize with default values', () => {
    expect(component.type).toBe('text');
    expect(component.errorMessages).toEqual([]);
  });

  it('should bind label input correctly', () => {
    component.label = 'Test Label';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement.nativeElement.textContent).toContain('Test Label');
  });

  it('should bind type input correctly', () => {
    component.type = 'password';
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input'));
    expect(inputElement.nativeElement.type).toBe('password');
  });

  it('should display error messages correctly', () => {
    component.errorMessages = [{ key: 'required', message: 'This field is required' }];
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.error-message'));
    expect(errorMessage.nativeElement.textContent).toContain('This field is required');
  });

  it('should be registered with NG_VALUE_ACCESSOR', () => {
    const providers = TestBed.inject(NG_VALUE_ACCESSOR);
    expect(providers).toContain({ provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true });
  });
});
