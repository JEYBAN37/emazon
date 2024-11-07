import { TestBed } from '@angular/core/testing';
import { AlertMessageService } from './alert-message.service';
import { Subject } from 'rxjs';

describe('AlertMessageService', () => {
  let service: AlertMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertMessageService],
    });
    service = TestBed.inject(AlertMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit success message when showSuccess is called', () => {
    const message = 'Success message';
    const spy = jest.fn();

    // Suscribir al observable de successMessage$
    service.successMessage$.subscribe(spy);

    // Llamar a showSuccess
    service.showSuccess(message);

    // Verificar que el mensaje se haya emitido correctamente
    expect(spy).toHaveBeenCalledWith(message);
  });

  it('should emit error message when showError is called', () => {
    const message = 'Error message';
    const spy = jest.fn();

    // Suscribir al observable de errorMessage$
    service.errorMessage$.subscribe(spy);

    // Llamar a showError
    service.showError(message);

    // Verificar que el mensaje de error se haya emitido correctamente
    expect(spy).toHaveBeenCalledWith(message);
  });

  it('should not emit message before calling showSuccess', () => {
    const message = 'Success message';
    const spy = jest.fn();

    // Suscribir al observable de successMessage$
    service.successMessage$.subscribe(spy);

    // No llamamos a showSuccess
    // Verificar que no se haya emitido ningún mensaje
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not emit message before calling showError', () => {
    const message = 'Error message';
    const spy = jest.fn();

    // Suscribir al observable de errorMessage$
    service.errorMessage$.subscribe(spy);

    // No llamamos a showError
    // Verificar que no se haya emitido ningún mensaje
    expect(spy).not.toHaveBeenCalled();
  });
});
