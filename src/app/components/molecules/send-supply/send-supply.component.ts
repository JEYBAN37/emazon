import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Supply } from 'src/app/shared/models/supply-interface';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { SupplyService } from 'src/app/shared/services/supply/supply.service';

@Component({
  selector: 'app-send-supply',
  templateUrl: './send-supply.component.html',
  styleUrls: ['./send-supply.component.scss']
})
export class SendSupplyComponent implements OnInit {
  @Input() fieldsToDisplay: { key: string; label: string }[] = [];
  @Input() supplies: Supply[] = [];
  @Input() label!: string;
  @Input() description!: string;
  @Input() columns: string[] = [];
  @Output() suppliesUpdated = new EventEmitter<any>();

  constructor(
    public alertService: AlertMessageService,
    public supplyService: SupplyService,
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  sendSupplies(): void {
    if (!this.supplies.length) {
      this.alertService.showError('No se han agregado suministros');
      return;
    }

    this.supplyService.fetchSupplyData(this.supplies).subscribe({
      next: (response) => {
        this.alertService.showSuccess('Suministros enviados exitosamente');
        this.suppliesUpdated.emit(response);
        this.supplies = [];
      },
      error: (error) => {
        this.alertService.showError(
          error.error?.message || 'Hubo un error al enviar'
        );
      },
    });
  }

  onSupplyAdded(supply: Supply): void {
    this.supplies.push(supply);
  }

  // Método para eliminar un suministro específico
  removeSupply(index: number): void {
    this.supplies.splice(index, 1); // Elimina el suministro por índice
  }

  getPropertyValue(obj: any, key: string): any {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
}
