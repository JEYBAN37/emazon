import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = 'Button'; // Texto del botón
  @Input() disabled: boolean = false; // Estado de deshabilitado
  @Input() type: 'primary' | 'secondary' | 'danger' = 'primary'; // Estilo del botón
  @Output() clicked = new EventEmitter<void>(); // Evento que se emite al hacer clic

  onClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}