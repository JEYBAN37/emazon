import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ObjectServiceInterface, ObjectStock } from 'src/app/shared/services/stock-service-interface';

@Component({
  selector: 'app-card-user-aux',
  templateUrl: './card-user-aux.component.html',
  styleUrls: ['./card-user-aux.component.scss']
})
export class CardUserAuxComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showSuccess: boolean = false;
  showError: boolean = false;

  @Input() service!: ObjectServiceInterface; 
  objectStock!: ObjectStock;
  public userAuxForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    //@Inject(OBJECT_SERVICE) private objectService: ObjectServiceInterface // Usar el token aquí
  ) {}
  
   ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.userAuxForm = this.formBuilder.group({
      name:['',[Validators.required, Validators.maxLength(50)]],
      lastName:['',[Validators.required, Validators.maxLength(90)]],
      dni:['',Validators.required,Validators.maxLength(18)],
      telephone:['',Validators.required,Validators.maxLength(13)],
      dateAge:['',Validators.required,this.dateValidator],
      email:['',Validators.required,Validators.email],
      password:['',Validators.required,Validators.minLength(6),Validators.maxLength(50)]
    });
  }


  public dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // Check if the value is a valid date
    const dateValue = new Date(control.value);
    if (isNaN(dateValue.getTime())) {
      return { invalidDate: true }; // return error if invalid
    }
    return null; // return null if valid
  }

  send(){
    if (this.userAuxForm.invalid) {
      this.userAuxForm.markAllAsTouched();
      return;
    }

    const objectStock:ObjectStock = {
      name: this.userAuxForm.value.name,
      lastName: this.userAuxForm.value.lastName,
      dni: this.userAuxForm.value.dni,
      telephone : this.userAuxForm.value.telephone,
      dateAge : this.userAuxForm.value.dateAge,
      email: this.userAuxForm.value.email,
      password :  this.userAuxForm.value.password
    }

  
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
    console.error('Error al enviar solicitud:', error);
    
    this.errorMessage = error.error?.message || "Hubo un error al enviar";
    this.showError = true;
    this.successMessage = null;

    this.cdr.detectChanges();

    setTimeout(() => {
      this.showError = false;
      this.cdr.detectChanges();
    }, 2000);
  }

  nameControl(variable:string): FormControl {
    return this.userAuxForm.get(variable) as FormControl;
  }

}
