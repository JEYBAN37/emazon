import { Component, Input, OnInit, Type } from '@angular/core';
import { ApiFactoryService } from 'src/app/shared/services/factory-api/api-factory.service';

@Component({
  selector: 'app-card-get-stock',
  templateUrl: './card-get-stock.component.html',
  styleUrls: ['./card-get-stock.component.scss']
})
export class CardGetStockComponent<T> implements OnInit {

  @Input() dataClass!: Type<T>;                         // Clase de datos
  @Input() fieldsToDisplay: { key: string; label: string }[] = [];  // Campos a mostrar
  @Input() params: any = {};                            // Parámetros adicionales
  @Input() label!: string;                              // Etiqueta para el card
  @Input() description!: string;                        // Descripción para el card
  @Input() columns: string[] = [];                      // Columnas que se mostrarán
  @Input() apiUrl!: string;                             // URL de la API
  
  page: number = 0;
  sizeData : number = 0;                                     // Página actual
  ascending: boolean = false;                           // Orden ascendente/descendente
  byCategory!: string;                                  // Categoría de los datos
  searchTerm: string = '';                               // Término de búsqueda
  data: T[] = [];                                       // Datos obtenidos

  constructor(private apiFactory: ApiFactoryService) {}

  // Cargar los datos combinando los parámetros de entrada
  loadData(): void {
    // Combina los parámetros adicionales con los de la paginación
    const combinedParams = {
      ...this.params, // Parámetros adicionales
      page: this.page,  // Paginación
      ascending: this.ascending,
    };

    // Hacer la solicitud al API con todos los parámetros combinados
    this.apiFactory.createGet<T[]>(this.apiUrl, combinedParams).subscribe(
      (objects: T[]) => {
        this.data = objects;  
        this.sizeData = objects.length; // Guardar los datos obtenidos
      },
      (error) => {
        console.error('Error al obtener los datos de stock:', error);
      }
    );
  }

   refresh() {
    this.loadData()
  }

  ngOnInit(): void {
    this.loadData();  // Cargar datos al inicializar el componente
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;  // Disminuir la página
      this.loadData();  // Cargar los datos de la nueva página
    }
  }

  nextPage(): void {
    if (this.sizeData !== 1)  // Si hay 5 elementos en la página
      this.page++;  // Aumentar la página
      this.loadData();  // Cargar los datos de la nueva página
  }

  toggleOrder(): void {
    this.ascending = !this.ascending;  // Cambiar el orden ascendente/descendente
    this.loadData();  // Recargar los datos con el nuevo orden
  }

  // Método para obtener el valor de una propiedad específica en un objeto
  getPropertyValue(obj: any, key: string): any {
    return key.split('.').reduce((acc, part) => {
      // Si 'part' es un número, se accede al índice del array
      if (acc && !isNaN(Number(part))) {
        return acc[parseInt(part, 10)];
      }
      return acc && acc[part];
    }, obj);
  }
  
}
