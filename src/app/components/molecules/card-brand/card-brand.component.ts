import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Brand } from 'src/app/shared/models/brand-interface';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { BrandFormBuilderService } from 'src/app/shared/services/brands/brand-form-builder.service';
import { BrandService } from 'src/app/shared/services/brands/brand.service';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';
import { BRAND_CONSTANTS } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-card-brand',
  templateUrl: './card-brand.component.html',
  styleUrls: ['./card-brand.component.scss'],
  providers: [AlertMessageService]
})
export class CardBrandComponent implements OnInit {
  public brandForm !: FormGroup
  public title : string =BRAND_CONSTANTS.TITLE;
  public subtitle : string = BRAND_CONSTANTS.SUBTITLE;
  public successMessage: string = BRAND_CONSTANTS.SUCCESSMESSAGE;
  public erroMessage: string = BRAND_CONSTANTS.ERRORMESSAGE;
  @Output() refresGet = new EventEmitter<void>();
  
  constructor(
    public brandService: BrandService,
    public brandFormBuilder: BrandFormBuilderService,
    public validationService: ValidationService,
    public alertService: AlertMessageService,
    public cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
    this.brandForm = this.brandFormBuilder.initBrandForm();
  }

  getData(): void {
    if (this.brandForm.invalid) { 
      this.validationService.markFormGroupTouched(this.brandForm);
      return;
    }

    const brand: Brand = { ...this.brandForm.value };
    this.brandService.fetchBrandData(brand).subscribe({
      next: (response) => {
        this.alertService.showSuccess(this.successMessage);
        this.refresGet.emit(); 
        this.brandForm.reset();
      },
      error: (error) => {
        this.alertService.showError(
          error.error?.message || this.erroMessage
        );
      },
    });
  }

  getFormControl(controlName: string): FormControl {
    return this.brandForm.get(controlName) as FormControl;
  }
}
