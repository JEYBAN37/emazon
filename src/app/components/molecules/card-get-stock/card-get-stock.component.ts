import { Component, Input, OnInit } from '@angular/core';
import { ObjectServiceInterface, ObjectStock } from 'src/app/shared/services/stock-service-interface';

@Component({
  selector: 'app-card-get-stock',
  templateUrl: './card-get-stock.component.html',
  styleUrls: ['./card-get-stock.component.scss']
})
export class CardGetStockComponent implements OnInit {
  
  @Input() service!: ObjectServiceInterface;  // El servicio que se usará para obtener datos
  @Input() label!: string;                     // Etiqueta para el card
  @Input() description!: string;               // Descripción para el card
  @Input() columns: string[] = [];
  @Input() size :number = 5;               // Las columnas que se mostrarán
  data: ObjectStock[] = [];
  page:number = 0;                     // Datos que se mostrarán en la tabla  
  ascending : boolean = false;  
  byBrand !: string ;               // Datos que se mostrarán en la tabla
  byName !: string;   
  byCategory !: string; 
  searchTerm: string = '';   
  private searchTimeout: any;   
  constructor() {}

  ngOnInit(): void {
    this.loadData(); // Cargar datos al inicializar el componente
  }

  loadData(): void {
    this.service.get(this.page, this.size, this.ascending,this.byBrand,this.byName,this.byCategory).subscribe(
      (objects: ObjectStock[]) => {
        this.data = objects; // Asigna los datos recibidos al array de datos
      },
      (error) => {
        console.error('Error al obtener los datos de stock:', error);
      }
    );
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--; // Disminuye la página
      this.loadData(); // Carga los datos de la nueva página
    }
  }

  nextPage(): void {
    this.page++; // Aumenta la página
    this.loadData(); // Carga los datos de la nueva página
  }

  toggleOrder(): void {
    this.ascending = !this.ascending; // Alterna el estado de orden
    this.loadData(); // Carga los datos nuevamente con el nuevo orden
  }
}
