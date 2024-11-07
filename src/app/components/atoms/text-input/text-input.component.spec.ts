import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TextInputComponent } from './text-input.component';
import { By } from '@angular/platform-browser';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], // Asegúrate de incluir ReactiveFormsModule
      declarations: [TextInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label'; // Asigna una etiqueta para la prueba
    fixture.detectChanges(); // Dispara la detección de cambios
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label text', () => {
    component.label = 'Test Label';
    fixture.detectChanges(); // Trigger change detection
    const labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement.nativeElement.textContent.trim()).toBe('Test Label');
  });

  it('should set the form control value', () => {
    component.control = new FormControl('Initial Value');
    fixture.detectChanges(); // Trigger change detection
    expect(component.control.value).toBe('Initial Value');
  });

  it('should apply error messages if present', () => {
    component.errorMessages = [
      { key: 'required', message: 'This field is required.' },
      { key: 'minlength', message: 'Minimum length is 3.' }
    ];
    fixture.detectChanges(); // Trigger change detection

    // Asegúrate de que la longitud de errorMessages sea correcta
    expect(component.errorMessages.length).toBe(2);
    expect(component.errorMessages[0].message).toBe('This field is required.');
  });

  it('should bind input value to form control', () => {
    component.control = new FormControl('');
    fixture.detectChanges(); // Trigger change detection
  
    // Cambia 'input' a 'textarea' para buscar el textarea correcto
    const textareaElement = fixture.debugElement.query(By.css('textarea')).nativeElement;
    textareaElement.value = 'Test Input';
    textareaElement.dispatchEvent(new Event('input')); // Simula el evento input
  
    expect(component.control.value).toBe('Test Input');
  });
  
});
