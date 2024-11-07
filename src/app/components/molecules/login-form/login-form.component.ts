import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login-service';
import { OBJECT_SERVICE, ObjectServiceInterface } from 'src/app/shared/services/stock-service-interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit  {

    successMessage: string | null = null;
    errorMessage: string | null = null;
    showSuccess: boolean = false;
    showError: boolean = false;
    loginForm !: FormGroup;
    isLoading: boolean = false;
    username !: string 
    service !: LoginService; 
    
    constructor(
      private formBuilder: FormBuilder,
      private cdr: ChangeDetectorRef,
      private router: Router,
      @Inject(OBJECT_SERVICE) private objectService: ObjectServiceInterface 
    ) {}
    
  ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],

    });
  }

  send() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.router.navigate(['/panel-admin']);

    const objectStock = this.loginForm.value;


    this.service.create(objectStock).subscribe({
      next: (response) => this.handleSuccess(response),
      error: (error) => this.handleError(error)
    });
  }

  public handleSuccess(response: any) {
    console.log('Respuesta del backend:', response);
    this.successMessage = "Formulario enviado exitosamente";
    this.showSuccess = true;
    this.errorMessage = null;

    this.cdr.detectChanges(); // Actualiza la vista

    setTimeout(() => {
      this.showSuccess = false;
      this.cdr.detectChanges();
    }, 2000);
  }

  public handleError(error: any) {
    this.errorMessage = error.error?.message || "Hubo un error al enviar";
    this.showError = true;
    this.successMessage = null;

    this.cdr.detectChanges();

    setTimeout(() => {
      this.showError = false;
      this.cdr.detectChanges();
    }, 2000);
  }
  
  nameControl(variable : string): FormControl {
    return this.loginForm.get(variable) as FormControl;
  }
    

  }
