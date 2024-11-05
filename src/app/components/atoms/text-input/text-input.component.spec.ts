import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextInputComponent } from './text-input.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInputComponent],
      imports: [ReactiveFormsModule], // Import ReactiveFormsModule for FormControl usage
    }).compileComponents();

    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
  });

  it('should create the TextInput component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input properties', () => {
    expect(component.label).toBeUndefined();
    expect(component.row).toBeUndefined();
    expect(component.errorMessages).toEqual([]);
  });

  it('should display the label text', () => {
    component.label = 'Test Label';
    fixture.detectChanges(); // Trigger change detection
    const labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement.nativeElement.textContent).toContain('Test Label');
  });

  it('should bind the control value', () => {
    component.control = new FormControl('Initial Value');
    fixture.detectChanges(); // Trigger change detection
    const inputElement = fixture.debugElement.query(By.css('input'));
    expect(inputElement.nativeElement.value).toBe('Initial Value');
  });

  it('should display error messages', () => {
    component.control = new FormControl('', { updateOn: 'blur' });
    component.errorMessages = [{ key: 'required', message: 'This field is required' }];
    fixture.detectChanges(); // Trigger change detection
    component.control.setErrors({ required: true }); // Simulate error state
    fixture.detectChanges(); // Trigger change detection again
    const errorElement = fixture.debugElement.query(By.css('.error-message')); // Assume you have a class for error messages
    expect(errorElement.nativeElement.textContent).toContain('This field is required');
  });
});
