import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { UserLoginFormBuilderService } from 'src/app/shared/services/user-login/user-login-form-builder.service';
import { UserLoginService } from 'src/app/shared/services/user-login/user-login.service';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';

@Component({
  selector: 'app-form-session',
  templateUrl: './form-session.component.html',
  styleUrls: ['./form-session.component.scss']
})
export class FormSessionComponent implements OnInit {
  public userForm!: FormGroup;
  @Input() public typeUser !: string;
  @Input() public subtitle !: string;
  @Input() public route !: string;


  constructor(
    public userLoginFormBuilder: UserLoginFormBuilderService,
    public userLoginService: UserLoginService,
    public validationService: ValidationService,
    public alertService: AlertMessageService,
    public cdr : ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.userLoginFormBuilder.InicialUserLoginForm();
  }

  getData(): void {
    if (this.userForm.invalid) { 
      this.validationService.markFormGroupTouched(this.userForm);
      return;
    }

    this.router.navigate([this.route]); 

  }
  
  getFormControl(controlName: string): FormControl {
    return this.userForm.get(controlName) as FormControl;
  }
}