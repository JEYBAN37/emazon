import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-search',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectSearchComponent implements OnInit {
  @Input() options: { value: string; label: string }[] = []; // Opciones pasadas al componente
  @Input() control!: FormControl; // Control de formulario

  searchTerm: string = ''; // Término de búsqueda
  filteredOptions: { value: string; label: string }[] = []; // Opciones filtradas

  ngOnInit() {
    this.filteredOptions = this.options; // Inicialmente, muestra todas las opciones
  }

  // Filtra las opciones basado en el término de búsqueda
  onSearchChange() {
    this.filteredOptions = this.options.filter(option =>
      option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Selecciona una opción y actualiza el control
  selectOption(option: { value: string; label: string }) {
    this.control.setValue(option.value); // Establece el valor en el control del formulario
    this.searchTerm = ''; // Resetea el término de búsqueda
    this.filteredOptions = this.options; // Resetea las opciones filtradas
  }
}
