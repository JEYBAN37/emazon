import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserAux } from 'src/app/shared/models/aux-interface';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { AuxFormBuilderService } from 'src/app/shared/services/auxUser/aux-form-builder.service';
import { AuxUserService } from 'src/app/shared/services/auxUser/aux-user.service';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';
import { USER_CONSTANTS } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-card-aux',
  templateUrl: './card-aux.component.html',
  styleUrls: ['./card-aux.component.scss'],
  providers: [AlertMessageService]
})
export class CardAuxComponent implements OnInit {
  public userAuxForm !: FormGroup;
  public title : string =USER_CONSTANTS.TITLE;
  public subtitle : string = USER_CONSTANTS.SUBTITLE;
  public successMessage: string = USER_CONSTANTS.SUCCESSMESSAGE;
  public erroMessage: string = USER_CONSTANTS.ERRORMESSAGE;
  
  constructor(
    public userAuxService: AuxUserService,
    public userAuxFormBuilder: AuxFormBuilderService,
    public validationService: ValidationService,
    public alertService: AlertMessageService,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userAuxForm = this.userAuxFormBuilder.initAuxUserForm();
  }

  getData(): void {
    if (this.userAuxForm.invalid) { 
      this.validationService.markFormGroupTouched(this.userAuxForm);
      return;
    }

    const userAux: UserAux = { ...this.userAuxForm.value };

    this.userAuxService.fetchUserAuxData(userAux).subscribe({
      next: (response) => {
        this.alertService.showSuccess(this.successMessage);
        this.userAuxForm.reset();
      },
      error: (error) => {
        this.alertService.showError(
          error.error?.message || this.erroMessage
        );
      },
    });
  }

    getFormControl(controlName: string): FormControl {
      return this.userAuxForm.get(controlName) as FormControl;
  }
}