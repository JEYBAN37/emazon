import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAux } from 'src/app/shared/models/aux-interface';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { AuxUserService } from 'src/app/shared/services/auxUser/aux-user.service';
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
public title : string  = 'Registro de Usuario';
public subtitle : string = 'Ingresa tus datos para registrarte';

  constructor(
    public userFormBuilder: UserRegisterFormBuilderService,
    public useService: UserRegisterService,
    public validationService: ValidationService,
    public alertService: AlertMessageService,
    public cdr: ChangeDetectorRef,
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
    this.useService.fetchUserData(user).subscribe({
      next: (response) => {
        this.alertService.showSuccess('Usuario Cliente creado exitosamente');
        this.userRegisterForm.reset();
        this.toLogin()
      },
      error: (error) => {
        this.alertService.showError(
          error.error?.message || 'Hubo un error al enviar'
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
