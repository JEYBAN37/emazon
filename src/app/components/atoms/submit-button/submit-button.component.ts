import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent {
  @Input() label: string = 'Enviar'; // Etiqueta del botón, por defecto 'Enviar'
  @Input() disabled: boolean = false; // Propiedad para desactivar el botón
  @Output() action = new EventEmitter<void>(); // Evento de salida para la acción del botón

  onClick() {
    this.action.emit(); // Emite el evento cuando se hace clic en el botón
  }
}
