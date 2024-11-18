import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SUPPLY_CONSTANTS } from 'src/app/shared/constants/constant';
import { Supply } from 'src/app/shared/models/supply-interface';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { SupplyFormBuilderService } from 'src/app/shared/services/supply/supply-form-builder.service';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';

@Component({
  selector: 'app-card-supply',
  templateUrl: './card-supply.component.html',
  styleUrls: ['./card-supply.component.scss'],
  providers: [AlertMessageService]
})
export class CardSupplyComponent implements OnInit {
  public supplyForm !: FormGroup
  public title : string = SUPPLY_CONSTANTS.TITLE;
  public subtitle : string = SUPPLY_CONSTANTS.SUBTITLE;
  public successMessage: string = SUPPLY_CONSTANTS.SUCCESSMESSAGE;

  supplyToSend: Supply[] = [];
  @Output() supplyAdded  = new EventEmitter<Supply>();

  constructor(
    public supplyFormBuilder: SupplyFormBuilderService,
    public validationService: ValidationService,
    public alertService: AlertMessageService,
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.supplyForm = this.supplyFormBuilder.initSupplyForm();
  }

  getData(): void {
    if (this.supplyForm.invalid) {
      this.validationService.markFormGroupTouched(this.supplyForm);
      return;
    }

    const supply: Supply = { ...this.supplyForm.value };
    this.alertService.showSuccess(this.successMessage);
    this.supplyToSend.push(supply);
    this.supplyAdded.emit(supply);
    this.supplyForm.reset();

  }

  getFormControl(controlName: string): FormControl {
    return this.supplyForm.get(controlName) as FormControl;
  }

}
