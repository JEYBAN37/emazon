import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SEND_SUPPLY_CONSTANTS } from 'src/app/shared/constants/constant';
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

  public successMessage: string = SEND_SUPPLY_CONSTANTS.SUCCESSMESSAGE;
  public erroMessage: string = SEND_SUPPLY_CONSTANTS.ERRORMESSAGESEND;
  public errorSend: string = SEND_SUPPLY_CONSTANTS.ERRORMESSAGE;

  constructor(
    public alertService: AlertMessageService,
    public supplyService: SupplyService,
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  sendSupplies(): void {
    if (!this.supplies.length) {
      this.alertService.showError(this.errorSend);
      return;
    }

    this.supplyService.fetchSupplyData(this.supplies).subscribe({
      next: (response) => {
        this.alertService.showSuccess(this.successMessage);
        this.suppliesUpdated.emit(response);
        this.supplies = [];
      },
      error: (error) => {
        this.alertService.showError(
          error.error?.message || this.erroMessage
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
