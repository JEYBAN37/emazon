import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-type-selection-component',
  templateUrl: './user-type-selection-component.component.html',
  styleUrls: ['./user-type-selection-component.component.scss']
})
export class UserTypeSelectionComponentComponent {

  selectedType: string | null = null;

  userTypes = [
    { id: 'cliente', name: 'Cliente', icon: 'user', description: 'Acceso a servicios y productos' },
    { id: 'auxiliar', name: 'Auxiliar', icon: 'user-cog', description: 'Asistencia y soporte técnico' },
    { id: 'administrador', name: 'Administrador', icon: 'shield', description: 'Control total del sistema' },
  ];

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.selectedType) {
      console.log(`Tipo de usuario seleccionado: ${this.selectedType}`);
      // Aquí puedes agregar la lógica para redirigir al usuario o procesar la selección
    }
  }
}
