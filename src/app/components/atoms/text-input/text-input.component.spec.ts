import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextInputComponent } from './text-input.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], // Asegúrate de importar ReactiveFormsModule
      declarations: [TextInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('test'); // Proporcionar un control
    fixture.detectChanges(); // Detectar cambios después de la inicialización
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica si el componente se crea correctamente
  });

  it('should display the label', () => {
    component.label = 'Test Label';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement.nativeElement.textContent).toContain('Test Label'); // Verifica si el label se muestra correctamente
  });


  it('should not display any error message when no errors are provided', () => {
    component.errorMessages = [];
    fixture.detectChanges();

    const errorMessages = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorMessages.length).toBe(0); // Verifica que no haya mensajes de error cuando el array esté vacío
  });

});
