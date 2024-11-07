import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertMessageService {
  private successMessageSubject = new Subject<string>();
  private errorMessageSubject = new Subject<string>();

  successMessage$ = this.successMessageSubject.asObservable();
  errorMessage$ = this.errorMessageSubject.asObservable();

  showSuccess(message: string): void {
    this.successMessageSubject.next(message);
  }

  showError(message: string): void {
    this.errorMessageSubject.next(message);
  }
}
