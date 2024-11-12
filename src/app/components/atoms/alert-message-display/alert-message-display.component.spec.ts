import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AlertMessageDisplayComponent } from './alert-message-display.component';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';

describe('AlertMessageDisplayComponent', () => {
  let component: AlertMessageDisplayComponent;
  let fixture: ComponentFixture<AlertMessageDisplayComponent>;
  let alertService: AlertMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertMessageDisplayComponent],
      providers: [AlertMessageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertMessageDisplayComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertMessageService);
    fixture.detectChanges();
  });

  it('should display success message when successMessage$ emits a value', fakeAsync(() => {
    alertService.showSuccess('Success Message');
    fixture.detectChanges();

    // Verificar que el mensaje de éxito aparece
    const successElement = fixture.nativeElement.querySelector('.alert-success');
    expect(successElement).toBeTruthy();
    expect(successElement.textContent).toContain('Success Message');

    // Avanza el temporizador en 2000ms para hacer desaparecer el mensaje
    tick(4000);
    fixture.detectChanges();

    // Verificar que el mensaje de éxito desaparece después de 2 segundos
    const hiddenSuccessElement = fixture.nativeElement.querySelector('.alert-success');
    expect(hiddenSuccessElement).toBeNull();
  }));

  it('should display error message when errorMessage$ emits a value', fakeAsync(() => {
    alertService.showError('Error Message');
    fixture.detectChanges();

    // Verificar que el mensaje de error aparece
    const errorElement = fixture.nativeElement.querySelector('.alert-danger');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('Error Message');

    // Avanza el temporizador en 2000ms para hacer desaparecer el mensaje
    tick(4000);
    fixture.detectChanges();

    // Verificar que el mensaje de error desaparece después de 2 segundos
    const hiddenErrorElement = fixture.nativeElement.querySelector('.alert-danger');
    expect(hiddenErrorElement).toBeNull();
  }));
});
