import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { REGISTER_CONSTANTS } from 'src/app/shared/constants/constant';
import { UserAux } from 'src/app/shared/models/aux-interface';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { AuthService } from 'src/app/shared/services/factory-api/auth-service.service';
import { UserRegisterFormBuilderService } from 'src/app/shared/services/user/user-register-form-builder.service';
import { UserRegisterService } from 'src/app/shared/services/user/user-register.service';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';

@Component({
  selector: 'app-panel-register',
  templateUrl: './panel-register.component.html',
  styleUrls: ['./panel-register.component.scss'],
  providers: [AlertMessageService]
})
export class PanelRegisterComponent implements OnInit {

public userRegisterForm !: FormGroup;
public title : string  = REGISTER_CONSTANTS.TITLE;
public subtitle : string = REGISTER_CONSTANTS.SUBTITLE;
public successMessage: string = REGISTER_CONSTANTS.SUCCESSMESSAGE;
public erroMessage: string = REGISTER_CONSTANTS.ERRORMESSAGE

  constructor(
    public userFormBuilder: UserRegisterFormBuilderService,
    public useService: UserRegisterService,
    public validationService: ValidationService,
    public alertService: AlertMessageService,
    public cdr: ChangeDetectorRef,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.userRegisterForm = this.userFormBuilder.initUserForm();
  }

  getData(): void {
    if (this.userRegisterForm.invalid) { 
      this.validationService.markFormGroupTouched(this.userRegisterForm);
      return;
    }

    const user: UserAux = { ...this.userRegisterForm.value };
    this.authService.clearToken();
    this.useService.fetchUserData(user).subscribe({
      next: (response) => {

        this.alertService.showSuccess(this.successMessage);
        this.userRegisterForm.reset();
        this.toLogin()
      },
      error: (error) => {
        this.alertService.showError(
          error.error?.message ||  this.erroMessage
        );
      },
    });
   
  }

    getFormControl(controlName: string): FormControl {
      return this.userRegisterForm.get(controlName) as FormControl;
    }

    toLogin() {
      this.router.navigate(['/']);
    }

}
