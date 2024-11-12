import { Component, Input, OnInit } from '@angular/core';
import { SupplyDetails } from 'src/app/shared/models/supply-interface';

@Component({
  selector: 'app-response-supply',
  templateUrl: './response-supply.component.html',
  styleUrls: ['./response-supply.component.scss']
})
export class ResponseSupplyComponent implements OnInit {
  @Input() fieldsToDisplay: { key: string; label: string }[] = [];  // Campos a mostrar
  @Input() supplies: SupplyDetails[] = [];
  @Input() label!: string;                              // Etiqueta para el card
  @Input() description!: string;                        // Descripción para el card
  @Input() columns: string[] = []; 
  constructor() { }

  ngOnInit(): void {
  }
  getPropertyValue(obj: any, key: string): any {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
}
